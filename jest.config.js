module.exports = {
  moduleFileExtensions: ['ts', 'js', 'json'],
  testEnvironment: "jsdom",
  testURL: 'http://localhost/',
  verbose: true,
  testMatch: [
    '<rootDir>/__tests__/**/*spec.ts'
  ],
  transform: {
    ".(ts)": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/__test__/"
  ],
  mapCoverage: true,
  collectCoverage: true
}