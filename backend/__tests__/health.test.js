const request = require('supertest');
const app = require('../server');

describe('Health Check Tests', () => {
  
  describe('GET /api/health', () => {
    it('should return server health status', async () => {
      const res = await request(app)
        .get('/api/health');
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('status');
      expect(res.body.status).toBe('success');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('timestamp');
    });
  });
});
