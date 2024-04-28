const { defaults } = require('jest-config');

module.exports = {
  ...defaults,
  transformIgnorePatterns: ['/node_modules/(?!axios)/'],
  moduleNameMapper: {
    '^axios$': '<rootDir>/node_modules/axios',
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
};
