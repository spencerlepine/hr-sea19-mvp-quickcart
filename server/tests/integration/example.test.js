const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');

const setupTestDB = require('../utils/setupTestDB');
const app = require('../../src/app');

setupTestDB();

describe('POST /api/some-endpoint', () => {
  let newUser;

  beforeEach(() => {
    newUser = {
      name: faker.name.findName(),
      email: faker.internet.email().toLowerCase(),
      password: 'password1',
      role: 'user',
    };
  });

  it('should do something', async () => {
    expect(true).toBeTruthy();
    // const res = await request(app)
    //   .post('/api/some-endpoint')
    //   // .set('Authorization', `Bearer ${adminAccessToken}`)
    //   .send(newUser)
    //   .expect(httpStatus.CREATED);
  });
});
