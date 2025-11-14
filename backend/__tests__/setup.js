// Test setup file
const mongoose = require('mongoose');

// Increase timeout for all tests
jest.setTimeout(30000);

// Close database connection after all tests
afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
});
