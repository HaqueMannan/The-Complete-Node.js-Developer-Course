const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

// Create new router
const router = new express.Router()

// Resource Creating Endpoints
router.post('/users', async (req, res) => {
   const user = new User(req.body)

   try {
      await user.save()
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

// User Logout Endpoints
router.post('/users/logout', auth, async (req, res) => {
   try {
      req.user.tokens = req.user.tokens.filter((token) => {
         return token.token !== req.token
      })
      await req.user.save()

      res.send()
   } catch (error) {
      res.status(500).send()
   }
})

router.post('/users/logoutAll', auth, async (req, res) => {
   try {
      req.user.tokens = []
      await req.user.save()

      res.send()
   } catch (error) {
      res.status(500).send()
   }
})

// Resource Reading Endpoints
router.get('/users/me', auth, async (req, res) => {
   res.send(req.user)
})

///////////////////////////////////////////////////////
// SOLUTION
///////////////////////////////////////////////////////
// Resource Updating Endpoints
router.patch('/users/:me', auth, async (req, res) => {
   const updates = Object.keys(req.body)
   const allowedUpdates = ['name', 'email', 'password', 'age']
   const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

   if(!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!'})
   }

   try {
      updates.forEach((update) => req.user[update] = req.body[update])
      await req.user.save()
      res.send(req.user)
   } catch (error) {
      res.status(400).send(error)
   }
})

// Resource Deleting Endpoints
router.delete('/users/me', auth, async (req, res) => {
   try {
      // const user = await User.findByIdAndDelete(req.user._id)

      // if(!user) {
      //    return res.status(404).send()
      // }
      
      // res.send(user)

      // Achieve the exact same result as the above code but with less code:
      await req.user.remove()
      res.send(req.user)
   } catch (error) {
      res.status(500).send(error)
   }
})

// Export router
module.exports = router


///////////////////////////////////////////////////////
// CHALLENGE - Refactor the update profile route
///////////////////////////////////////////////////////
// 1. Update the URL to /users/me
// 2. Add the authentication middleware
// 3. Us the existing user document instead of fetching via params.id
// 4. To test from Postman:
//    - ensure script npm run dev is running and the database server is also running
//    - Run the PATCH Update User URL in postman to make a API request to the servers