const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
   _id: userOneId,
   name: 'Jessica Bliss',
   email: 'j.bliss@email.com',
   password: 'Example123$!',
   tokens: [{
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
   }]
}

beforeEach(async () => {
   await User.deleteMany()
   await new User(userOne).save()
})

test('Should signup a new user', async () => {
   const response = await request(app)
      .post('/users')
      .send({
         name: 'John Doe',
         email: 'j.doe@email.com',
         password: 'Example123$!'
      })
      .expect(201)

   // Assert that the database was changed correctly
   const user = await User.findById(response.body.user._id)
   expect(user).not.toBeNull()

   // Assertions about the response body property - Method 1: Single property
   expect(response.body.user.name).toBe('John Doe')
   expect(user.password).not.toBe('Example123$!')

   // Assertions about the response body property - Method 2: Multiple properties
   expect(response.body).toMatchObject({
      user: {
         name: 'John Doe',
         email: 'j.doe@email.com',
      },
      token: user.tokens[0].token
   })
})

test('Should login existing user', async () => {
   const response = await request(app)
      .post('/users/login')
      .send({
         email: userOne.email,
         password: userOne.password
      })
      .expect(200)

   const user = await User.findById(userOneId)
   expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login non-existent user', async () => {
   await request(app)
      .post('/users/login')
      .send({
         email: userOne.email,
         password: 'wrongPassword'
      })
      .expect(400)
})

test('Should get profile for user', async () => {
   await request(app)
      .get('/users/me')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
   await request(app)
      .get('/users/me')
      .send()
      .expect(401)
})

test('Should delete account for user', async () => {
   await request(app)
      .delete('/users/me')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200)

   const user = await User.findById(userOneId)
   expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async () => {
   await request(app)
      .delete('/users/me')
      .send()
      .expect(401)
})