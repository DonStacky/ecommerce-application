export interface CreateOptions<T extends keyof HTMLElementTagNameMap> {
  tagname: T;
  childElements?: (HTMLElement | SVGElement)[];
  options?: ElementOptions<HTMLElementTagNameMap[T]>;
  events?: [keyof HTMLElementEventMap, EventListenerOrEventListenerObject][];
}

export type ElementOptions<T> = [keyof T, T[keyof T]][];

export interface LoginValidation {
  login: boolean;
  password: boolean;
}

export type Address = {
  country: HTMLSelectElement;
  streetName: HTMLInputElement;
  postalCode: HTMLInputElement;
  city: HTMLInputElement;
};

export type CustomerData = {
  isCommonAddress: HTMLInputElement;
  isBillingDefault: HTMLInputElement;
  isShippingDefault: HTMLInputElement;
  firstName: HTMLInputElement;
  lastName: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
  birthDate: HTMLInputElement;
  billingAddress: Address;
  shippingAddress: Address;
};
