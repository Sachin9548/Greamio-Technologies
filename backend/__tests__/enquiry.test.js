const request = require('supertest');
const app = require('../server');

describe('Enquiry Tests', () => {
  let token;
  let userId;

  beforeAll(async () => {
    // Register and login to get token
    const email = `test${Date.now()}@example.com`;
    await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: email,
        password: 'password123'
      });

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: email,
        password: 'password123'
      });

    token = loginRes.body.token;
    userId = loginRes.body.user.id;
  });

  describe('POST /api/enquiries', () => {
    it('should create a new enquiry', async () => {
      const res = await request(app)
        .post('/api/enquiries')
        .set('Authorization', `Bearer ${token}`)
        .send({
          customerName: 'John Doe',
          email: 'john@example.com',
          phone: '1234567890',
          message: 'I need help with my order'
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('enquiry');
      expect(res.body.enquiry.customerName).toBe('John Doe');
    });

    it('should fail without authentication', async () => {
      const res = await request(app)
        .post('/api/enquiries')
        .send({
          customerName: 'John Doe',
          email: 'john@example.com',
          phone: '1234567890',
          message: 'Test message'
        });
      
      expect(res.statusCode).toBe(401);
    });

    it('should fail with invalid data', async () => {
      const res = await request(app)
        .post('/api/enquiries')
        .set('Authorization', `Bearer ${token}`)
        .send({
          customerName: 'J',
          email: 'invalid-email',
          phone: '123',
          message: 'Short'
        });
      
      expect(res.statusCode).toBe(400);
    });
  });

  describe('GET /api/enquiries', () => {
    it('should get all enquiries', async () => {
      const res = await request(app)
        .get('/api/enquiries')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('enquiries');
      expect(Array.isArray(res.body.enquiries)).toBe(true);
    });

    it('should filter by status', async () => {
      const res = await request(app)
        .get('/api/enquiries?status=new')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('enquiries');
    });

    it('should search enquiries', async () => {
      const res = await request(app)
        .get('/api/enquiries?search=john')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('enquiries');
    });
  });

  describe('PUT /api/enquiries/:id', () => {
    it('should update an enquiry', async () => {
      // First create an enquiry
      const createRes = await request(app)
        .post('/api/enquiries')
        .set('Authorization', `Bearer ${token}`)
        .send({
          customerName: 'Jane Doe',
          email: 'jane@example.com',
          phone: '9876543210',
          message: 'Test enquiry'
        });

      const enquiryId = createRes.body.enquiry._id;

      // Then update it
      const res = await request(app)
        .put(`/api/enquiries/${enquiryId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          status: 'in-progress'
        });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.enquiry.status).toBe('in-progress');
    });
  });

  describe('DELETE /api/enquiries/:id', () => {
    it('should delete an enquiry', async () => {
      // First create an enquiry
      const createRes = await request(app)
        .post('/api/enquiries')
        .set('Authorization', `Bearer ${token}`)
        .send({
          customerName: 'Delete Test',
          email: 'delete@example.com',
          phone: '1111111111',
          message: 'To be deleted'
        });

      const enquiryId = createRes.body.enquiry._id;

      // Then delete it
      const res = await request(app)
        .delete(`/api/enquiries/${enquiryId}`)
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message');
    });
  });
});
