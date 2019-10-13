const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase } = require('../tests/fixtures/db')

beforeEach(setupDatabase)

test('Should signup a new user', async () => {
   const response = await request(app)
      .post('/users')
      .send({
         name: 'John Doe',
         email: 'j.doe@email.com',
         password: 'Example123$!'
      })
      .expect(201)

   const user = await User.findById(response.body.user._id)
   expect(user).not.toBeNull()

   expect(response.body).toMatchObject({
      user: {
         name: 'John Doe',
         email: 'j.doe@email.com',
      },
      token: user.tokens[0].token
   })
   expect(user.password).not.toBe('Example123$!')
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

test('Should upload avatar image', async () => {
   await request(app)
      .post('/users/me/avatar')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .attach('avatar', 'tests/fixtures/profile-pic.jpg')
      .expect(200)

   const user = await User.findById(userOneId)
   expect(user.avatar).toEqual(expect.any(Buffer))
   // We use toEqual rather than toBe because toBe uses === and two objects are not the same in memory even though they are of the same type which is why expect({}).toBe({}) would always fail with objects and so we would have to use toEqual instead.
   // We can use .any() to check the thing in expect is of the type we pass into .any() i.e. Buffer, String, Number, boolean, etc. So we want to check the avatar property to see if it is a Buffer.
})

test('Should update valid user fields', async () => {
   await request(app)
      .patch('/users/me')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({
         name: 'Jemma'
      })
      .expect(200)

   const user = await User.findById(userOneId)
   expect(user.name).toEqual('Jemma')
   // We can use either .toBe or .toEqual and both would work. It may be easier to always use toEqual.
})

test('Should not update invalid user fields', async () => {
   await request(app)
      .patch('/users/me')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({
         location: 'London'
      })
      .expect(400)
})