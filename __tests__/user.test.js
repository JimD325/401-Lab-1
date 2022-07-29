const { it, expect } = require('@jest/globals')
const supertest = require("supertest");
const server = require("../src/server.js");
const { db } = require('../src/db');

//sqlite initialization
beforeAll(async () => {
  await db.sync();
})

//sqlite termination
afterAll(async () => {
  await db.drop();
})

const request = supertest(server.app);

describe('User functionality for lab 6', () => {
  it('Creates user/signup', async () => {

    const res = await request.post('/signup').send({
      username: 'Rick Grimes',
      password: '1234'
    });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      username: 'Rick Grimes',
      password: '1234'
    })
  })
  // it('Can login', async () => {

  // })
})