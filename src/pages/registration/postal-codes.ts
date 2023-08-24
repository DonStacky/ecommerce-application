export default [
  {
    Note: 'Placed on a line of its own.',
    Country: 'Russia',
    ISO: 'RU',
    Format: 'NNNNNN',
    Regex: '^\\d{6}$',
  },
  {
    Note: '',
    Country: 'Poland',
    ISO: 'PL',
    Format: 'NN-NNN',
    Regex: '^\\d{2}[-]{1}\\d{3}$',
  },
  {
    Note: 'References: http://www.post.lt/en/help/postal-code-search. Previously 9999 which was actually the old Soviet 999999 format code with the first 2 digits dropped.',
    Country: 'Lithuania',
    ISO: 'LT',
    Format: 'Lt-NNNNN',
    Regex: '^Lt[-]{1}\\d{5}$',
  },
  {
    Note: 'With Switzerland, ordered from west to east. Range 9485 - 9498.',
    Country: 'Liechtenstein',
    ISO: 'LI',
    Format: 'NNNN',
    Regex: '^\\d{4}$',
  },
];
