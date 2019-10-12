const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const userOne = {
   name: 'Jessica Bliss',
   email: 'j.bliss@email.com',
   password: 'Example123$!'
}

beforeEach(async () => {
   await User.deleteMany()
   await new User(userOne).save()
})

test('Should signup a new user', async () => {
   await request(app).post('/users').send({
      name: 'John Doe',
      email: 'j.doe@email.com',
      password: 'Example123$!'
   }).expect(201)
})

test('Should login existing user', async () => {
   await request(app).post('/users/login').send({
      email: userOne.email,
      password: userOne.password
   }).expect(200)
})

test('Should not login non-existent user', async () => {
   await request(app).post('/users/login').send({
      email: userOne.email,
      password: 'wrongPassword'
   }).expect(400)
})


///////////////////////////////////////////////////////
// JEST GLOBAL FUNCTIONS:
///////////////////////////////////////////////////////
// Jest function that runs before each test case:
// beforeEach(() => {
//    console.log('beforeEach')
// })

// Access to done to let Jest know when a asynchronous function has completed. Alternatively we could use async/await to achieve the below:
// beforeEach((done) => {
//    User.deleteMany()
//    done()
// })

// // Jest function that runs once before all test case:
// beforeAll(() => {
//    console.log('beforeEach')
// })

// // Jest function that runs after each test case:
// afterEach(() => {
//    console.log('afterEach')
// })

// // Jest function that runs once after each test case:
// afterAll(() => {
//    console.log('afterEach')
// })