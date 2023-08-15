import { findCountry } from '../pages/registration/form-validation';

it('Should find details for provided country', () => {
  expect(findCountry('Russia')).toEqual({
    Note: 'Placed on a line of its own.',
    Country: 'Russia',
    ISO: 'RU',
    Format: 'NNNNNN',
    Regex: '^\\d{6}$',
  });
});

it('Should return empty template in case of missing searching country', () => {
  expect(findCountry('invalid country')).toEqual({
    Note: '',
    Country: '',
    ISO: '',
    Format: '',
    Regex: '',
  });
});
