import { Customer, ErrorObject, ErrorResponse } from '@commercetools/platform-sdk';
import loginCustomer from '../../shared/api/login-customer';
import {
  addAddress,
  changeAddress,
  changePassword,
  removeAddress,
  setDefaultBillingAddress,
  setDefaultShippingAddress,
  // eslint-disable-next-line prettier/prettier
  updateUserInformation
} from '../../shared/api/update-customer';
import { createElementBase, findDomElement } from '../../shared/helpers/dom-utilites';
import GetUserData from '../../shared/helpers/get-user-data';
import showModal from '../../shared/modal/modal-window';
import countries from '../registration/postal-codes';
import EditAddressForm from './edit-address-form';
import EditPasswordForm from './edit-password-form';
import EditUserForm from './edit-user-form';
import ModalProfileChange from './modal-profile';

export default class ProfilePage extends GetUserData {
  PROFILE_CONTAINER: HTMLDivElement;

  PROFILE_BODY: HTMLDivElement;

  PROFILE_PAGE: HTMLDivElement;

  PROFILE_CARD: HTMLDivElement;

  CARD_BODY_USER: HTMLDivElement;

  CARD_IMG: HTMLImageElement;

  CARD_TITLE: HTMLDivElement;

  FULLNAME: HTMLHeadingElement;

  ADDRESS: HTMLParagraphElement;

  PROFILE_FORM_USER: HTMLDivElement;

  FORM_BODY_USER: HTMLDivElement;

  BUTTON_USER: HTMLDivElement;

  BUTTON_CONTAINER: HTMLDivElement;

  BUTTON_EDIT: HTMLAnchorElement;

  BUTTON_CHANGE_PASSWORD: HTMLAnchorElement;

  CARD_BODY_ADDRESS: HTMLDivElement;

  FORM_BODY_ADDRESS: HTMLDivElement;

  PROFILE_FORM_CONTAINER: HTMLDivElement;

  PROFILE_FORM_ADDRESS: HTMLDivElement;

  editUserForm: EditUserForm;

  editAddressForm: EditAddressForm;

  editPasswordForm: EditPasswordForm;

  modalUserChange: ModalProfileChange;

  modalAddressChange: ModalProfileChange;

  modalPasswordChange: ModalProfileChange;

  constructor() {
    super();

    // Card elements
    this.PROFILE_CONTAINER = createElementBase('div', ['container', 'container_margin'], 'profile-page');
    this.PROFILE_BODY = createElementBase('div', ['main-body']);
    this.PROFILE_PAGE = createElementBase('div', ['row', 'gutters-sm', 'justify-content-end']);
    this.PROFILE_CARD = createElementBase('div', ['col-md-4', 'mb-3', 'card']);
    this.CARD_BODY_USER = createElementBase('div', [
      'card-body',
      'd-flex',
      'flex-column',
      'align-items-center',
      'text-center',
    ]);
    this.CARD_IMG = createElementBase('img', ['rounded-circle', 'card__image_width']);
    this.CARD_TITLE = createElementBase('div', ['mt-3']);
    this.FULLNAME = createElementBase('h2', [], undefined, this.getFullName());
    this.ADDRESS = createElementBase(
      'p',
      ['text-muted', 'font-size-sm'],
      undefined,
      this.getShippingAddress()?.address
    );

    this.CARD_BODY_ADDRESS = createElementBase('div', [
      'card-body',
      'd-flex',
      'flex-column',
      'align-items-center',
      'text-center',
    ]);

    // Form elements
    this.PROFILE_FORM_CONTAINER = createElementBase('div', ['d-flex', 'flex-column']);
    this.PROFILE_FORM_USER = createElementBase('div', ['col-md-8', 'card', 'mb-3']);

    this.PROFILE_FORM_ADDRESS = createElementBase('div', ['col-md-8', 'card']);

    this.FORM_BODY_USER = this.createUserFormBody();
    this.BUTTON_USER = createElementBase('div', ['row']);
    this.FORM_BODY_ADDRESS = this.createAddressFormBody();
    this.BUTTON_CONTAINER = createElementBase('div', ['col-sm-12']);
    this.BUTTON_EDIT = createElementBase('a', ['btn', 'btn-info', 'btn-lg'], undefined, 'Edit');
    this.BUTTON_CHANGE_PASSWORD = createElementBase(
      'a',
      ['btn', 'btn-info', 'btn-lg', 'ms-5'],
      undefined,
      'Change password'
    );

    this.CARD_IMG.setAttribute('alt', 'User image');
    this.CARD_IMG.setAttribute('src', 'https://bootdey.com/img/Content/avatar/avatar7.png');
    this.BUTTON_EDIT.setAttribute('data-bs-toggle', 'modal');
    this.BUTTON_EDIT.setAttribute('data-bs-target', '#userModal');
    this.BUTTON_CHANGE_PASSWORD.setAttribute('data-bs-toggle', 'modal');
    this.BUTTON_CHANGE_PASSWORD.setAttribute('data-bs-target', '#passwordModal');

    this.editUserForm = new EditUserForm();
    this.editAddressForm = new EditAddressForm();
    this.editPasswordForm = new EditPasswordForm();
    this.modalUserChange = new ModalProfileChange(this.editUserForm.FORM, 'userModal');
    this.modalAddressChange = new ModalProfileChange(this.editAddressForm.FORM, 'addressModal');
    this.modalPasswordChange = new ModalProfileChange(this.editPasswordForm.FORM, 'passwordModal');
    this.appendElements();
    this.addEvents();
  }

  private createUserFormBody() {
    const nameData = ['Full name', 'Email', 'Birthday'];
    const titleData = [this.getFullName(), this.userData?.email, this.getBirthdayForUser()];
    const ELEMENT = createElementBase('div', ['card-body']);

    for (let i = 0; i < 3; i += 1) {
      const FORM_ROW = createElementBase('div', ['row']);
      const NAME_FIELD = createElementBase('div', ['col-sm-3']);
      const NAME_TEXT = createElementBase('h3', ['mb-0'], undefined, nameData[i]);
      const TITLE = createElementBase('div', ['col-sm-9', 'text-secondary'], undefined, titleData[i]);
      const HR = createElementBase('hr', []);

      NAME_FIELD.append(NAME_TEXT);
      FORM_ROW.append(NAME_FIELD, TITLE);
      ELEMENT.append(FORM_ROW, HR);
    }

    return ELEMENT;
  }

  private createAddressFormBody() {
    const nameData = ['Shipping address', 'Billing address'];
    const titleData = [this.getShippingAddress(), this.getBillingAddress()];
    const id = ['shippingCollapse', 'billingCollapse'];
    const ELEMENT = createElementBase('div', ['card-body']);

    for (let i = 0; i < 2; i += 1) {
      const fieldId = ['shippingField', 'billingField'];
      const FORM_ROW = createElementBase('div', ['row'], fieldId[i]);
      const NAME_FIELD = createElementBase('div', ['col-sm-3']);
      const NAME_TEXT = createElementBase('h3', ['mb-0'], undefined, nameData[i]);
      const TITLE_CONTAINER = createElementBase('div', ['col-sm-9']);
      const TITLE_LIST_CONTAINER = createElementBase('div', ['collapse'], id[i]);
      const FORM_ROW_TITLE = createElementBase('div', ['row']);
      const TITLE = createElementBase('div', ['text-secondary'], titleData[i]?.id, titleData[i]?.address);
      const BUTTON_ADDRESS = createElementBase('div', ['row']);
      const BUTTON_CONTAINER = createElementBase('div', ['col-sm-12']);
      const ROW_ADD_LINK = createElementBase('div', ['row']);
      const TITLE_ADD_LINK = createElementBase('a', ['new-address', 'link-dark'], undefined, 'Add new address');

      const BUTTON_SHOW = createElementBase('button', ['btn', 'btn-info', 'btn-lg'], 'shippingShow', 'Show/Hide');

      const createElementHr = () => createElementBase('hr', []);

      const address = this.getAddresses(nameData[i]);

      address.forEach((item) => {
        if (item) {
          const ROW = createElementBase('div', ['row']);
          const ADDR_TITLE = createElementBase('div', ['text-secondary', 'text-secondary_edit'], item.id, item.address);

          ADDR_TITLE.setAttribute('data-bs-toggle', 'modal');
          ADDR_TITLE.setAttribute('data-bs-target', '#addressModal');

          ROW.append(ADDR_TITLE);
          TITLE_LIST_CONTAINER.append(ROW);
          TITLE_LIST_CONTAINER.append(createElementHr());
        }
      });

      BUTTON_SHOW.setAttribute('data-bs-toggle', 'collapse');
      BUTTON_SHOW.setAttribute('data-bs-target', `#${id[i]}`);

      if (titleData[i]?.address !== 'Set some address as default') {
        TITLE.classList.add('text-secondary_edit');
        TITLE.setAttribute('data-bs-toggle', 'modal');
        TITLE.setAttribute('data-bs-target', '#addressModal');
      }

      TITLE_ADD_LINK.setAttribute('href', '#');
      TITLE_ADD_LINK.setAttribute('data-bs-toggle', 'modal');
      TITLE_ADD_LINK.setAttribute('data-bs-target', '#addressModal');

      ROW_ADD_LINK.append(TITLE_ADD_LINK);
      TITLE_LIST_CONTAINER.append(ROW_ADD_LINK);
      NAME_FIELD.append(NAME_TEXT);
      FORM_ROW_TITLE.append(TITLE);
      TITLE_CONTAINER.append(FORM_ROW_TITLE, createElementHr(), TITLE_LIST_CONTAINER);
      FORM_ROW.append(NAME_FIELD, TITLE_CONTAINER);
      BUTTON_ADDRESS.append(BUTTON_CONTAINER);
      BUTTON_CONTAINER.append(BUTTON_SHOW);
      ELEMENT.append(FORM_ROW, BUTTON_ADDRESS);

      if (i < 1) ELEMENT.append(createElementHr());
    }
    return ELEMENT;
  }

  private appendElements() {
    this.CARD_TITLE.append(this.FULLNAME, this.ADDRESS);
    this.CARD_BODY_USER.append(this.CARD_IMG, this.CARD_TITLE);
    this.PROFILE_CARD.append(this.CARD_BODY_USER);

    this.BUTTON_CONTAINER.append(this.BUTTON_EDIT, this.BUTTON_CHANGE_PASSWORD);
    this.BUTTON_USER.append(this.BUTTON_CONTAINER);
    this.FORM_BODY_USER.append(
      this.modalUserChange.MODAL_CONTAINER,
      this.modalAddressChange.MODAL_CONTAINER,
      this.modalPasswordChange.MODAL_CONTAINER,
      this.BUTTON_USER
    );

    this.PROFILE_FORM_USER.append(this.FORM_BODY_USER);
    this.PROFILE_FORM_ADDRESS.append(this.FORM_BODY_ADDRESS);
    this.PROFILE_PAGE.append(this.PROFILE_CARD, this.PROFILE_FORM_USER, this.PROFILE_FORM_ADDRESS);
    this.PROFILE_BODY.append(this.PROFILE_PAGE);
    this.PROFILE_CONTAINER.append(this.PROFILE_BODY);
  }

  private addEvents() {
    // кнопка Save формы редактирования данных пользователя
    this.editUserForm.SAVE_BUTTON.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLButtonElement;
      if (target.tagName !== 'BUTTON') return;

      const firstName = this.editUserForm.NAME_INPUT.value;
      const lastName = this.editUserForm.LAST_NAME_INPUT.value;
      const email = this.editUserForm.EMAIL_INPUT.value;
      const birthday = this.editUserForm.BIRTH_DATE_INPUT.value;

      updateUserInformation(firstName, lastName, email, birthday)
        .then(({ body }) => {
          this.modalUserChange.modal?.hide();
          localStorage.setItem('userInformation', JSON.stringify(body));
          this.replasePage();
          showModal(true, 'update user information');
        })
        .catch((err: ErrorObject) => {
          showModal(false, 'Update user information', err.message);
        });
    });

    // Кнопка Save формы редактирования адреса
    this.editAddressForm.SAVE_BUTTON.addEventListener('click', async (event: MouseEvent) => {
      const target = event.target as HTMLButtonElement;
      if (target.tagName !== 'BUTTON') return;

      const countryFromForm = this.editAddressForm.COUNTRY_SELECT.value;
      const [country] = countries.filter((item) => item.Country === countryFromForm);
      const city = this.editAddressForm.CITY_INPUT.value;
      const streetName = this.editAddressForm.STREET_INPUT.value;
      const postalCode = this.editAddressForm.POSTAL_CODE_INPUT.value;

      try {
        if (this.editAddressForm.DELETE_BUTTON.hasAttribute('disabled')) {
          const { body } = await addAddress(country.ISO, city, streetName, postalCode);

          this.editAddressForm.addressId = body.addresses.at(-1)?.id || '';
          localStorage.setItem('userInformation', JSON.stringify(body));

          if (!this.editAddressForm.SET_DEFAULT.checked) {
            this.modalAddressChange.modal?.hide();
            this.replasePage();
          }
        } else {
          const { body } = await changeAddress(
            this.editAddressForm.addressId,
            country.ISO,
            city,
            streetName,
            postalCode
          );
          localStorage.setItem('userInformation', JSON.stringify(body));

          if (!this.editAddressForm.SET_DEFAULT.checked) {
            this.modalAddressChange.modal?.hide();
            this.replasePage();
          }
        }

        if (this.editAddressForm.SET_DEFAULT.checked) {
          let body: Customer | undefined;
          if (this.editAddressForm.addressType === 'shipping') {
            ({ body } = await setDefaultShippingAddress(this.editAddressForm.addressId));
          }
          if (this.editAddressForm.addressType === 'billing') {
            ({ body } = await setDefaultBillingAddress(this.editAddressForm.addressId));
          }

          this.modalAddressChange.modal?.hide();
          localStorage.setItem('userInformation', JSON.stringify(body));
          this.replasePage();
        }
        showModal(true, 'change address');
      } catch (err) {
        const error = err as ErrorResponse;
        showModal(false, 'Change address', error.message);
      }
    });

    // Выбор адреса для редактирования
    this.PROFILE_FORM_ADDRESS.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.classList[0] !== 'text-secondary' && target.classList[0] !== 'new-address') return;
      if (target.innerText === 'Set some address as default') return;

      const addressArr = target.innerText.split(', ');
      const COUNTRY_OPTION_SELECTED = findDomElement<'option'>(this.editAddressForm.FORM, 'option[selected="true"]');
      const FIELDS = this.editAddressForm.FORM.querySelectorAll('.form-field > input') as NodeListOf<HTMLInputElement>;
      if (target.closest('#shippingField')) {
        this.editAddressForm.addressType = 'shipping';
      } else if (target.closest('#billingField')) {
        this.editAddressForm.addressType = 'billing';
      }

      COUNTRY_OPTION_SELECTED.removeAttribute('selected');

      if (target.classList[0] === 'text-secondary') {
        const country = countries.filter((item) => item.ISO === addressArr[0]);
        const COUNTRY_OPTION_FIND = findDomElement<'option'>(
          this.editAddressForm.FORM,
          `option[value="${country[0].Country}"]`
        );

        FIELDS.forEach((item, index) => {
          const element = item;
          element.value = addressArr[index + 1];
        });

        COUNTRY_OPTION_FIND.setAttribute('selected', 'true');
        this.editAddressForm.DELETE_BUTTON.removeAttribute('disabled');
        this.editAddressForm.addressId = target.id;
      } else {
        // установить дефолтные значения для полей
        FIELDS.forEach((item) => {
          const element = item;
          element.value = '';
        });

        this.editAddressForm.COUNTRY_PRESELECTED_OPTION.setAttribute('selected', 'true');
        this.editAddressForm.DELETE_BUTTON.setAttribute('disabled', '');
        this.editAddressForm.addressId = '';
      }
    });

    // Кнопка удаления адреса
    this.editAddressForm.DELETE_BUTTON.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLButtonElement;
      if (target.classList[0] !== 'delete-button') return;

      const addreses = this.userData?.addresses;
      if (addreses && addreses.length > 1) {
        removeAddress(this.editAddressForm.addressId)
          .then(({ body }) => {
            this.modalAddressChange.modal?.hide();
            localStorage.setItem('userInformation', JSON.stringify(body));
            this.replasePage();
            showModal(true, 'delete address');
          })
          .catch((err: ErrorObject) => {
            showModal(false, 'Delete address', err.message);
          });
      } else {
        showModal(false, 'Change address', 'You can`t delete this address. Please change them');
      }
    });

    // Кнопка Save формы редактирования пароля
    this.editPasswordForm.SAVE_BUTTON.addEventListener('click', async (event: MouseEvent) => {
      const target = event.target as HTMLButtonElement;
      if (target.tagName !== 'BUTTON') return;

      const currentPassword = this.editPasswordForm.OLD_PASSWORD_INPUT.value;
      const newPassword = this.editPasswordForm.NEW_PASSWORD_INPUT.value;
      const repeatPassword = this.editPasswordForm.REPEAT_NEW_PASSWORD_INPUT.value;
      const email = this.userData?.email;
      if (email) {
        try {
          if (newPassword === repeatPassword) {
            await changePassword(currentPassword, newPassword);
            const {
              body: { customer },
            } = await loginCustomer(email, newPassword);
            this.modalPasswordChange.modal?.hide();
            localStorage.setItem('userInformation', JSON.stringify(customer));
            this.replasePage();
            showModal(true, 'password changed');
          } else {
            throw new Error('Wrong repeat password');
          }
        } catch (err) {
          const error = err as ErrorResponse;
          showModal(false, 'Change password', error.message);
        }
      }
    });
  }

  private replasePage() {
    const PROFILE_PAGE = findDomElement(document.body, '#profile-page');

    PROFILE_PAGE.replaceWith(new ProfilePage().PROFILE_CONTAINER);
  }
}
