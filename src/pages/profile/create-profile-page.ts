import { ClientResponse, Customer, CustomerSignInResult } from '@commercetools/platform-sdk';
import { createElementBase } from '../../shared/helpers/dom-utilites';

export default class ProfilePage {
  userData: Customer | undefined;

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
    // user data
    this.userData = this.getUserData();

    // Card elements
    this.PROFILE_CONTAINER = createElementBase('div', ['container']);
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
    this.BUTTON_LINK.setAttribute('href', '/');
    this.appendElements();
  }

  private createFormBody() {
    const nameData = ['Full name', 'Email', 'Shipping address', 'Billing address', 'Birthday'];
    const titleData = [
      this.getFullName(),
      this.userData?.email,
      this.getShippingAddress(),
      'getBillingAddress()',
      'my Birthday',
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
    this.FORM_BODY.append(this.BUTTON_ROW);
    this.PROFILE_FORM.append(this.FORM_BODY);

    this.PROFILE_PAGE.append(this.PROFILE_CARD, this.PROFILE_FORM);
    this.PROFILE_BODY.append(this.PROFILE_PAGE);
    this.PROFILE_CONTAINER.append(this.PROFILE_BODY);
  }

  private getUserData() {
    const data = localStorage.getItem('userInformation');
    let userData: ClientResponse<CustomerSignInResult> | undefined;

    if (data) {
      userData = JSON.parse(data);
    }
    return userData?.body.customer;
  }

  private getFullName() {
    return `${this.userData?.firstName} ${this.userData?.lastName}`;
  }

  private getShippingAddress() {
    const shippingAddressId = this.userData?.shippingAddressIds;
    let ids: string;
    if (shippingAddressId) {
      const [id] = shippingAddressId;
      ids = id;
    }
    console.log(shippingAddressId);
    console.log(this.userData);

    const shippingAddress = this.userData?.addresses.filter((a) => a.id === ids);
    return shippingAddress
      ? `${shippingAddress[0].country}, ${shippingAddress[0].city}, ${shippingAddress[0].streetName}, ${shippingAddress[0].postalCode}`
      : '';
  }

  /*   private addEvents() {
    // Показать/скрыть пароль
    this.INPUT_CHECK.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLInputElement;

      if (target.checked) {
        this.INPUT_PASSWD.setAttribute('type', 'text');
      } else {
        this.INPUT_PASSWD.setAttribute('type', 'password');
      }
    });

    // Поле краснеет при первом фокусе на него
    this.INPUT_EMAIL.addEventListener(
      'focus',
      (event: FocusEvent) => {
        const target = event.target as HTMLInputElement;
        target.classList.add('form-control_validation');
      },
      { once: true }
    );

    this.INPUT_PASSWD.addEventListener(
      'focus',
      (event: FocusEvent) => {
        const target = event.target as HTMLInputElement;
        target.classList.add('form-control_validation');
      },
      { once: true }
    );

    this.FORM.addEventListener('keyup', this.liveValidation.bind(this));
    this.BUTTON.addEventListener('click', this.submit.bind(this));
  }

  private liveValidation(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    if (target.tagName !== 'INPUT') return;

    const text = target.value;

    if (this.HELP_PASSWD.innerText === 'Wrong email or password') {
      this.HELP_PASSWD.innerText = '';
      this.INPUT_EMAIL.classList.remove('form-control_validation');
      this.INPUT_PASSWD.classList.remove('form-control_validation');
    }

    if (target.id === 'InputEmail') {
      const validation = loginValidation({ login: text });

      if (typeof validation === 'string') {
        this.HELP_EMAIL.innerText = validation;
        target.classList.add('form-control_validation');
        loginValidationResults.login = false;
      } else {
        target.classList.remove('form-control_validation');
        this.HELP_EMAIL.innerText = '';
        loginValidationResults.login = true;
      }
    }

    if (target.id === 'InputPassword') {
      const validation = passwordValidation({ password: text });

      if (typeof validation === 'string') {
        this.HELP_PASSWD.innerText = validation;
        target.classList.add('form-control_validation');
        loginValidationResults.password = false;
      } else {
        target.classList.remove('form-control_validation');
        this.HELP_PASSWD.innerText = '';
        loginValidationResults.password = true;
      }
    }

    this.createBtnStatus(loginValidationResults);
  }

  private createBtnStatus(validationData: LoginValidation) {
    if (validationData.login && validationData.password) {
      this.BUTTON.removeAttribute('disabled');
    } else {
      this.BUTTON.setAttribute('disabled', '');
    }
  }

  private submit(event: MouseEvent) {
    const target = event.target as HTMLButtonElement;
    if (target.tagName !== 'BUTTON') return;
    event.preventDefault();

    loginCustomer(this.INPUT_EMAIL.value, this.INPUT_PASSWD.value)
      .then(() => {
        this.HELP_PASSWD.innerText = '';
        this.INPUT_EMAIL.value = '';
        this.INPUT_PASSWD.value = '';
        ROUTER.navigate('/');
        addLogoutBtn();
      })
      .catch((err: ErrorObject) => {
        if (err.body?.statusCode === StatusCodes.BAD_REQUEST) {
          this.HELP_PASSWD.innerText = 'Wrong email or password';
          this.INPUT_EMAIL.classList.add('form-control_validation');
          this.INPUT_PASSWD.classList.add('form-control_validation');
        } else {
          this.HELP_PASSWD.innerText = 'server error';
        }
        console.error(err);
      });
  }
 */
}
