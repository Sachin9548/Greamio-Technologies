// Simple health test that doesn't require database
describe('Simple Health Tests', () => {
  
  test('Environment variables are accessible', () => {
    expect(process.env.NODE_ENV).toBeDefined();
  });
  
  test('Basic math works', () => {
    expect(2 + 2).toBe(4);
  });
  
  test('JWT secret is available', () => {
    expect(process.env.JWT_SECRET).toBeDefined();
  });
  
  test('Application can start', () => {
    // Test that we can require the main modules without errors
    expect(() => {
      require('../models/User.model');
      require('../models/Enquiry.model');
    }).not.toThrow();
  });
});