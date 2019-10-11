const request = require('supertest')
const app = require('../src/app')

test('Should signup a new user', async () => {
   await request(app).post('/users').send({
      name: 'John Doe',
      email: 'j.doe@email.com',
      password: 'Example123$!'
   }).expect(201)
})