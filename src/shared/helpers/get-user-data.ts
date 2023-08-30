import { Customer } from '@commercetools/platform-sdk';

export default class GetUserData {
  userData: Customer | undefined;

  constructor() {
    this.userData = this.getUserData();
  }

  private getUserData() {
    const data = localStorage.getItem('userInformation');

    if (!data) return undefined;
    return JSON.parse(data);
  }

  getFirstName() {
    return this.userData?.firstName || '';
  }

  getLastName() {
    return this.userData?.lastName || '';
  }

  getFullName() {
    return `${this.userData?.firstName} ${this.userData?.lastName}`;
  }

  getEmail() {
    return this.userData?.email || '';
  }

  getAddresses(type: string) {
    const address = this.userData?.addresses;
    if (!address) return [];

    const addressesArr = address.map((item) => {
      if (type === 'Shipping address') {
        if (this.userData?.shippingAddressIds?.pop() === item.id) {
          return null;
        }
      }
      if (type === 'Billing address') {
        if (this.userData?.billingAddressIds?.pop() === item.id) {
          return null;
        }
      }
      return {
        id: item.id,
        address: `${item.country}, ${item.city}, ${item.streetName}, ${item.postalCode}`,
      };
    });
    return addressesArr;
  }

  getShippingAddress() {
    const shippingAddressId = this.userData?.shippingAddressIds;
    let ids: string;
    if (shippingAddressId) {
      [ids] = shippingAddressId;
      const shippingAddress = this.userData?.addresses.filter((a) => a.id === ids);

      return shippingAddress
        ? {
            id: ids,
            address: `${shippingAddress[0].country}, ${shippingAddress[0].city}, ${shippingAddress[0].streetName}, ${shippingAddress[0].postalCode}`,
          }
        : null;
    }
    return null;
  }

  getBillingAddress() {
    const billingAddressId = this.userData?.billingAddressIds;
    let ids: string;
    if (billingAddressId) {
      [ids] = billingAddressId;
      const shippingAddress = this.userData?.addresses.filter((a) => a.id === ids);

      return shippingAddress
        ? {
            id: ids,
            address: `${shippingAddress[0].country}, ${shippingAddress[0].city}, ${shippingAddress[0].streetName}, ${shippingAddress[0].postalCode}`,
          }
        : null;
    }
    return null;
  }

  getBirthdayForUser() {
    const birthdayData = this.userData?.dateOfBirth;
    const date = birthdayData?.split('-').reverse().join('.');
    return date || '';
  }

  getBirthday() {
    return this.userData?.dateOfBirth || '';
  }
}
