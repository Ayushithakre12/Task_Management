module.exports = {
  ...defaults,
  transformIgnorePatterns: ['/node_modules/(?!axios)/'],
  moduleNameMapper: {
    '^axios$': '<rootDir>/node_modules/axios',
  },
  transform: {
    '^.+\\.(js|jsx)$': ['esbuild-jest', { sourcemap: true }],
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
};