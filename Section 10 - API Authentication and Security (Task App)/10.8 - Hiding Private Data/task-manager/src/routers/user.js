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
      // res.send({ user: getPublicProfile(), token })
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