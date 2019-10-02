const express = require('express')
const User = require('../models/user')

// Create new router
const router = new express.Router()

// Resource Creating Endpoints
router.post('/users', async (req, res) => {
   const user = new User(req.body)

   try {
      await user.save()
      ///////////////////////////////////////////////////////
      // SOLUTION
      ///////////////////////////////////////////////////////
      const token = await user.generateAuthToken()
      res.status(201).send({ user, token })
   } catch (error) {
      res.status(400).send(error)
   }
})

// User Login Endpoints
router.post('/users/login', async (req, res) => {
   try {
      const user = await User.findByCredentials(req.body.email, req.body.password)
      const token = await user.generateAuthToken()
      res.send({ user, token })
   } catch (error) {
      res.status(400).send()
   }
})

// Resource Reading Endpoints
router.get('/users', async (req, res) => {
   try {
      const users = await User.find({})
      res.send(users)
   } catch (error) {
      res.status(500).send()
   }
})

router.get(('/users/:id'), async (req, res) => {
   const _id = req.params.id

   try {
      const user = await User.findById(_id)

      if(!user) {
         return res.status(404).send()
      }

      res.send(user)
   } catch (error) {
      res.status(500).send()
   }
})

// Resource Updating Endpoints
router.patch('/users/:id', async (req, res) => {
   const updates = Object.keys(req.body)
   const allowedUpdates = ['name', 'email', 'password', 'age']
   const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

   if(!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!'})
   }

   try {
      const user = await User.findById(req.params.id)
      
      updates.forEach((update) => user[update] = req.body[update])
      
      await user.save()

      if(!user) {
         return res.status(404).send()
      }

      res.send(user)
   } catch (error) {
      res.status(400).send(error)
   }
})

// Resource Deleting Endpoints
router.delete('/users/:id', async (req, res) => {
   try {
      const user = await User.findByIdAndDelete(req.params.id)

      if(!user) {
         return res.status(404).send()
      }

      res.send(user)
   } catch (error) {
      res.status(500).send(error)
   }
})

// Export router
module.exports = router


///////////////////////////////////////////////////////
// CHALLENGE - Having signup endpoint send back auth token
///////////////////////////////////////////////////////
// 1. Generate a token for the saved user
// 2. Send back the token and the user
// 3. Create a new user from Postman and confirm the token is there
// 4. To test from Postman:
//    - ensure script npm run dev is running and the database server is also running
//    - Run the POST Create user URL in postman to make a API request to the servers