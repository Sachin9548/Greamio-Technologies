module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'controllers/**/*.js',
    'models/**/*.js',
    'middlewares/**/*.js',
    '!**/node_modules/**'
  ],
  testMatch: [
    '**/__tests__/**/*.test.js'
  ],
  verbose: true,
  // Skip tests that require database connection in CI
  testPathIgnorePatterns: [
    '/node_modules/',
    // Temporarily ignore database-dependent tests
    '/__tests__/auth.test.js',
    '/__tests__/enquiry.test.js'
  ]
};