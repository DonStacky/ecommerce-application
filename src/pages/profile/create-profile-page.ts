import { ErrorObject } from '@commercetools/platform-sdk';
import updateCustomer from '../../shared/api/update-customer';
import { createElementBase, findDomElement } from '../../shared/helpers/dom-utilites';
import GetUserData from '../../shared/helpers/get-user-data';
import ModalProfileChange from './modal-profile';

export default class ProfilePage extends GetUserData {
  PROFILE_CONTAINER: HTMLDivElement;

  PROFILE_BODY: HTMLDivElement;

  PROFILE_PAGE: HTMLDivElement;

  PROFILE_CARD: HTMLDivElement;

  CARD_BODY: HTMLDivElement;

  CARD_IMG: HTMLImageElement;

  CARD_TITLE: HTMLDivElement;

  FULLNAME: HTMLHeadingElement;

  ADDRESS: HTMLParagraphElement;

  PROFILE_FORM: HTMLDivElement;

  FORM_BODY: HTMLDivElement;

  BUTTON_ROW: HTMLDivElement;

  BUTTON_CONTAINER: HTMLDivElement;

  BUTTON_LINK: HTMLAnchorElement;

  constructor() {
    super();

    // Card elements
    this.PROFILE_CONTAINER = createElementBase('div', ['container'], 'profile-page');
    this.PROFILE_BODY = createElementBase('div', ['main-body']);
    this.PROFILE_PAGE = createElementBase('div', ['row', 'gutters-sm']);
    this.PROFILE_CARD = createElementBase('div', ['col-md-4', 'mb-3', 'card']);
    this.CARD_BODY = createElementBase('div', [
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

    // Form elements
    this.PROFILE_FORM = createElementBase('div', ['col-md-8', 'card']);
    this.FORM_BODY = this.createFormBody();
    this.BUTTON_ROW = createElementBase('div', ['row']);
    this.BUTTON_CONTAINER = createElementBase('div', ['col-sm-12']);
    this.BUTTON_LINK = createElementBase('a', ['btn', 'btn-info', 'btn-lg'], undefined, 'Edit');

    this.CARD_IMG.setAttribute('alt', 'User image');
    this.CARD_IMG.setAttribute('src', 'https://bootdey.com/img/Content/avatar/avatar7.png');
    this.BUTTON_LINK.setAttribute('data-bs-toggle', 'modal');
    this.BUTTON_LINK.setAttribute('data-bs-target', '#profileModal');

    this.appendElements();
    // this.addEvents();
  }

  private createFormBody() {
    const nameData = ['Full name', 'Email', 'Shipping address', 'Billing address', 'Birthday'];
    const titleData = [
      this.getFullName(),
      this.userData?.email,
      this.getShippingAddress(),
      this.getBillingAddress(),
      this.getBirthdayForUser(),
    ];
    const ELEMENT = createElementBase('div', ['card-body']);

    for (let i = 0; i < 5; i += 1) {
      const FORM_ROW = createElementBase('div', ['row']);
      const NAME_FIELD = createElementBase('div', ['col-sm-3']);
      const NAME_TEXT = createElementBase('h3', ['mb-0'], undefined, nameData[i]);
      const TITLE = createElementBase('div', ['col-sm-9', 'text-secondary'], undefined, titleData[i]);
      const HR = createElementBase('hr', []);

      if (i === 2 || i === 3) {
        FORM_ROW.classList.add('profile__form_active');
        // FORM_ROW.addEventListener('click', this.openAddressList);
      }

      NAME_FIELD.append(NAME_TEXT);
      FORM_ROW.append(NAME_FIELD, TITLE);
      ELEMENT.append(FORM_ROW, HR);
    }

    return ELEMENT;
  }

  private appendElements() {
    this.CARD_TITLE.append(this.FULLNAME, this.ADDRESS);
    this.CARD_BODY.append(this.CARD_IMG, this.CARD_TITLE);
    this.PROFILE_CARD.append(this.CARD_BODY);

    this.BUTTON_CONTAINER.append(this.BUTTON_LINK);
    this.BUTTON_ROW.append(this.BUTTON_CONTAINER);
    this.FORM_BODY.append(new ModalProfileChange().MODAL_CONTAINER, this.BUTTON_ROW);
    this.PROFILE_FORM.append(this.FORM_BODY);

    this.PROFILE_PAGE.append(this.PROFILE_CARD, this.PROFILE_FORM);
    this.PROFILE_BODY.append(this.PROFILE_PAGE);
    this.PROFILE_CONTAINER.append(this.PROFILE_BODY);
  }

  private addEvents() {
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
  }
}
