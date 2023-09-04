import { Customer } from '@commercetools/platform-sdk';
import { AddressType } from '../../pages/profile/types';

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

  getAddresses(type: AddressType) {
    const address = this.userData?.addresses;
    if (!address) return [];

    const addressesArr = address.map((item) => {
      if (type === 'Shipping address') {
        const defaultShippingAddressId = this.userData?.defaultShippingAddressId;

        if (defaultShippingAddressId) {
          if (defaultShippingAddressId === item.id) {
            return null;
          }
        }
      }
      if (type === 'Billing address') {
        const defaultBillingAddressId = this.userData?.defaultBillingAddressId;

        if (defaultBillingAddressId) {
          if (defaultBillingAddressId === item.id) {
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
    const defaultShippingAddressId = this.userData?.defaultShippingAddressId;

    let ids = '';
    if (defaultShippingAddressId) {
      ids = defaultShippingAddressId;
    }

    const shippingAddress = this.userData?.addresses.filter((a) => a.id === ids);

    if (shippingAddress) {
      return shippingAddress.length !== 0
        ? {
            id: ids,
            address: `${shippingAddress[0].country}, ${shippingAddress[0].postalCode}, ${shippingAddress[0].city}, ${shippingAddress[0].streetName}`,
          }
        : {
            id: ids,
            address: 'Set some address as default',
          };
    }
    return null;
  }

  getBillingAddress() {
    const defaultBillingAddressId = this.userData?.defaultBillingAddressId;

    let ids = '';
    if (defaultBillingAddressId) {
      ids = defaultBillingAddressId;
    }

    const billingAddress = this.userData?.addresses.filter((a) => a.id === ids);

    if (billingAddress) {
      return billingAddress.length !== 0
        ? {
            id: ids,
            address: `${billingAddress[0].country}, ${billingAddress[0].postalCode}, ${billingAddress[0].city}, ${billingAddress[0].streetName}`,
          }
        : {
            id: ids,
            address: 'Set some address as default',
          };
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
