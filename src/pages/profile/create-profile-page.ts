import { createElementBase } from '../../shared/helpers/dom-utilites';
import GetUserData from '../../shared/helpers/get-user-data';
// eslint-disable-next-line import/no-cycle
import EditProfileForm from './edit-profile-form';
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

  constructor() {
    super();

    // Card elements
    this.PROFILE_CONTAINER = createElementBase('div', ['container'], 'profile-page');
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
    this.ADDRESS = createElementBase('p', ['text-muted', 'font-size-sm'], undefined, this.getShippingAddress());

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
    this.BUTTON_LINK.setAttribute('data-bs-target', '#profileModal');

    this.appendElements();
    // this.addEvents();
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
    const ELEMENT = createElementBase('div', ['card-body']);

    for (let i = 0; i < 2; i += 1) {
      const FORM_ROW = createElementBase('div', ['row']);
      const NAME_FIELD = createElementBase('div', ['col-sm-3']);
      const NAME_TEXT = createElementBase('h3', ['mb-0'], undefined, nameData[i]);
      const TITLE = createElementBase('div', ['col-sm-9', 'text-secondary'], undefined, titleData[i]);
      const HR = createElementBase('hr', []);

      FORM_ROW.classList.add('profile__form_active');

      NAME_FIELD.append(NAME_TEXT);
      FORM_ROW.append(NAME_FIELD, TITLE);
      ELEMENT.append(FORM_ROW, HR);
    }
    return ELEMENT;
  }

  private appendElements() {
    this.CARD_TITLE.append(this.FULLNAME, this.ADDRESS);
    this.CARD_BODY_USER.append(this.CARD_IMG, this.CARD_TITLE);
    this.PROFILE_CARD.append(this.CARD_BODY_USER);

    this.BUTTON_CONTAINER.append(this.BUTTON_LINK);
    this.BUTTON_USER.append(this.BUTTON_CONTAINER);
    this.FORM_BODY_USER.append(new ModalProfileChange(new EditProfileForm().FORM).MODAL_CONTAINER, this.BUTTON_USER);
    this.PROFILE_FORM_USER.append(this.FORM_BODY_USER);
    this.PROFILE_FORM_ADDRESS.append(this.FORM_BODY_ADDRESS);
    this.PROFILE_PAGE.append(this.PROFILE_CARD, this.PROFILE_FORM_USER, this.PROFILE_FORM_ADDRESS);
    this.PROFILE_BODY.append(this.PROFILE_PAGE);
    this.PROFILE_CONTAINER.append(this.PROFILE_BODY);
  }

  /* private addEvents() {
    this.BUTTON_LINK.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLAnchorElement;
      if (target.tagName !== 'A') return;

      updateCustomer()
        .then(({ body }) => {
          localStorage.setItem('userInformation', JSON.stringify(body));
          this.replaseProfilePage();
        })
        .catch((err: ErrorObject) => {
          console.error(err.message);
        });
    });
  }

  private replaseProfilePage() {
    const PROFILE_PAGE = findDomElement(document.body, '#profile-page');
    PROFILE_PAGE.replaceWith(new ProfilePage().PROFILE_CONTAINER);
  } */
}
