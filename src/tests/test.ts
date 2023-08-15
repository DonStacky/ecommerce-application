import { findCountry } from '../pages/registration/form-validation';

describe('findCountry', () => {
  it('Should find details for provided country', () => {
    const detailsRussia = {
      Note: 'Placed on a line of its own.',
      Country: 'Russia',
      ISO: 'RU',
      Format: 'NNNNNN',
      Regex: '^\\d{6}$',
    };

    const foundDetails = findCountry('Russia');

    expect(foundDetails).toEqual(detailsRussia);
  });

  it('Should return empty template in case of missing searching country', () => {
    const emptyDetails = {
      Note: '',
      Country: '',
      ISO: '',
      Format: '',
      Regex: '',
    };

    const foundDetails = findCountry('invalid Country');

    expect(foundDetails).toEqual(emptyDetails);
  });
});
