import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from './index';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('API Endpoints', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('GET /health returns status ok', async () => {
    const response = await request(app).get('/health');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  it('POST /users creates a new user', async () => {
    const email = `test-${Date.now()}@example.com`;
    
    const response = await request(app)
      .post('/users')
      .send({ email });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe(email);
  });

  it('POST /users returns 400 for invalid email', async () => {
    const response = await request(app)
      .post('/users')
      .send({ email: 'invalid-email' });
    
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
