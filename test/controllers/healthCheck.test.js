const request = require('supertest');

const app = require('../../app');

describe('GET /health', () => {
  let response = null;
  beforeAll(async done => {
    response = await request(app).get('/health');
    return done();
  });

  it('status is 200', () => {
    expect(response.status).toBe(200);
  });
  it('response has uptime property', () => {
    expect(response.body).toHaveProperty('uptime', expect.any(Number));
  });
});

describe('GET /health/redis', () => {
  let response = null;
  beforeAll(async done => {
    response = await request(app).get('/health/redis');
    return done();
  });

  it('status is 200', () => {
    expect(response.status).toBe(200);
  });
  it('response has result property', () => {
    expect(response.body).toHaveProperty('result', 'ok');
  });
});
