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
        const defaultShippingAddressId = this.userData?.defaultShippingAddressId;
        const shippingAddressIds = this.userData?.shippingAddressIds;

        if (defaultShippingAddressId) {
          if (defaultShippingAddressId === item.id) {
            return null;
          }
        } else if (shippingAddressIds) {
          if (shippingAddressIds[0] === item.id) {
            return null;
          }
        }
      }
      if (type === 'Billing address') {
        const defaultBillingAddressId = this.userData?.defaultBillingAddressId;
        const billingAddressIds = this.userData?.billingAddressIds;

        if (defaultBillingAddressId) {
          if (defaultBillingAddressId === item.id) {
            return null;
          }
        } else if (billingAddressIds) {
          if (billingAddressIds[0] === item.id) {
            return null;
          }
        }
      }
      return {
        id: item.id,
        address: `${item.country}, ${item.postalCode}, ${item.city}, ${item.streetName}`,
      };
    });
    return addressesArr;
  }

  getShippingAddress() {
    const shippingAddressIds = this.userData?.shippingAddressIds;
    const defaultShippingAddressId = this.userData?.defaultShippingAddressId;

    let ids = '';
    if (defaultShippingAddressId) {
      ids = defaultShippingAddressId;
    } else if (shippingAddressIds) {
      [ids] = shippingAddressIds;
    }

    const shippingAddress = this.userData?.addresses.filter((a) => a.id === ids);

    return shippingAddress
      ? {
          id: ids,
          address: `${shippingAddress[0].country}, ${shippingAddress[0].postalCode}, ${shippingAddress[0].city}, ${shippingAddress[0].streetName}`,
        }
      : null;
  }

  getBillingAddress() {
    const billingAddressIds = this.userData?.billingAddressIds;
    const defaultBillingAddressId = this.userData?.defaultBillingAddressId;

    let ids = '';
    if (defaultBillingAddressId) {
      ids = defaultBillingAddressId;
    } else if (billingAddressIds) {
      [ids] = billingAddressIds;
    }

    const billingAddress = this.userData?.addresses.filter((a) => a.id === ids);

    return billingAddress
      ? {
          id: ids,
          address: `${billingAddress[0].country}, ${billingAddress[0].postalCode}, ${billingAddress[0].city}, ${billingAddress[0].streetName}`,
        }
      : null;
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
