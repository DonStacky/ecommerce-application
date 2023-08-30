import { ErrorObject } from '@commercetools/platform-sdk';
import updateCustomer from '../../shared/api/update-customer';
import { createElementBase, findDomElement } from '../../shared/helpers/dom-utilites';
import GetUserData from '../../shared/helpers/get-user-data';
import countries from '../registration/postal-codes';
import EditAddressForm from './edit-address-form';
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

  BUTTON_LINK: HTMLAnchorElement;

  CARD_BODY_ADDRESS: HTMLDivElement;

  FORM_BODY_ADDRESS: HTMLDivElement;

  PROFILE_FORM_CONTAINER: HTMLDivElement;

  PROFILE_FORM_ADDRESS: HTMLDivElement;

  edit_user_form: EditUserForm;

  edit_address_form: EditAddressForm;

  modal_user_change: ModalProfileChange;

  modal_address_change: ModalProfileChange;

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
    this.BUTTON_LINK = createElementBase('a', ['btn', 'btn-info', 'btn-lg'], undefined, 'Edit');

    this.CARD_IMG.setAttribute('alt', 'User image');
    this.CARD_IMG.setAttribute('src', 'https://bootdey.com/img/Content/avatar/avatar7.png');
    this.BUTTON_LINK.setAttribute('data-bs-toggle', 'modal');
    this.BUTTON_LINK.setAttribute('data-bs-target', '#userModal');

    this.edit_user_form = new EditUserForm();
    this.edit_address_form = new EditAddressForm();
    this.modal_user_change = new ModalProfileChange(this.edit_user_form.FORM, 'userModal');
    this.modal_address_change = new ModalProfileChange(this.edit_address_form.FORM, 'addressModal');
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
      const FORM_ROW = createElementBase('div', ['row']);
      const NAME_FIELD = createElementBase('div', ['col-sm-3']);
      const NAME_TEXT = createElementBase('h3', ['mb-0'], undefined, nameData[i]);
      const TITLE_CONTAINER = createElementBase('div', ['col-sm-9']);
      const TITLE_LIST_CONTAINER = createElementBase('div', ['collapse'], id[i]);
      const FORM_ROW_TITLE = createElementBase('div', ['row']);
      const TITLE = createElementBase(
        'div',
        ['text-secondary', 'text-secondary_edit'],
        titleData[i]?.id,
        titleData[i]?.address
      );
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
      TITLE.setAttribute('data-bs-toggle', 'modal');
      TITLE.setAttribute('data-bs-target', '#addressModal');
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

    this.BUTTON_CONTAINER.append(this.BUTTON_LINK);
    this.BUTTON_USER.append(this.BUTTON_CONTAINER);
    this.FORM_BODY_USER.append(
      this.modal_user_change.MODAL_CONTAINER,
      this.modal_address_change.MODAL_CONTAINER,
      this.BUTTON_USER
    );

    this.PROFILE_FORM_USER.append(this.FORM_BODY_USER);
    this.PROFILE_FORM_ADDRESS.append(this.FORM_BODY_ADDRESS);
    this.PROFILE_PAGE.append(this.PROFILE_CARD, this.PROFILE_FORM_USER, this.PROFILE_FORM_ADDRESS);
    this.PROFILE_BODY.append(this.PROFILE_PAGE);
    this.PROFILE_CONTAINER.append(this.PROFILE_BODY);
  }

  private addEvents() {
    this.edit_user_form.SAVE_BUTTON.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLButtonElement;
      if (target.tagName !== 'BUTTON') return;

      const firstName = this.edit_user_form.NAME_INPUT.value;
      const lastName = this.edit_user_form.LAST_NAME_INPUT.value;
      const email = this.edit_user_form.EMAIL_INPUT.value;
      const birthday = this.edit_user_form.BIRTH_DATE_INPUT.value;

      updateCustomer(firstName, lastName, email, birthday)
        .then(({ body }) => {
          localStorage.setItem('userInformation', JSON.stringify(body));
          this.modal_user_change.modal?.hide();
          this.replaseProfilePage();
        })
        .catch((err: ErrorObject) => {
          console.error(err.message);
        });
    });

    this.PROFILE_FORM_ADDRESS.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.classList[0] !== 'text-secondary' && target.classList[0] !== 'new-address') return;

      const addressArr = target.innerText.split(', ');
      const COUNTRY_OPTION_SELECTED = findDomElement<'select'>(this.edit_address_form.FORM, 'option[selected="true"]');
      const FIELDS = this.edit_address_form.FORM.querySelectorAll(
        '.form-field > input'
      ) as NodeListOf<HTMLInputElement>;

      COUNTRY_OPTION_SELECTED.removeAttribute('selected');

      if (target.classList[0] === 'text-secondary') {
        const country = countries.filter((item) => item.ISO === addressArr[0]);
        const COUNTRY_OPTION_FIND = findDomElement<'option'>(
          this.edit_address_form.FORM,
          `option[value="${country[0].Country}"]`
        );

        FIELDS.forEach((item, index) => {
          const element = item;
          element.value = addressArr[index + 1];
        });

        COUNTRY_OPTION_FIND.setAttribute('selected', 'true');
      } else {
        // установить дефолтные значения для полей
        const COUNTRY_OPTION_1 = findDomElement<'select'>(this.edit_address_form.FORM, '#country').firstElementChild;

        COUNTRY_OPTION_1?.setAttribute('selected', 'true');
        FIELDS.forEach((item) => {
          const element = item;
          element.value = '';
        });
      }
    });
  }

  private replaseProfilePage() {
    const PROFILE_PAGE = findDomElement(document.body, '#profile-page');
    PROFILE_PAGE.replaceWith(new ProfilePage().PROFILE_CONTAINER);
  }
}
