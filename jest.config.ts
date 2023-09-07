/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  verbose: true,
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '\\.(jpg|svg|scss)$': '<rootDir>/src/tests/mocks/file-mock',
  },
};
