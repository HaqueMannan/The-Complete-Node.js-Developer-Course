const express = require('express')
const multer = require('multer')
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
      await req.user.remove()
      res.send(req.user)
   } catch (error) {
      res.status(500).send(error)
   }
})

// File Upload - Avatar:
const upload = multer({
   dest: 'avatars',
   limits: {
      fileSize: 1000000
   },
   fileFilter(req, file, cb) {
      // Single file extension:
      // if(!file.originalname.endsWith('.jpg')) {
      //    return cb(new Error('Please upload a image file'))
      // }

      // Multiple file extension using RegEx:
      if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
         return cb(new Error('Please upload an image'))
      }

      cb(undefined, true)
   }
})

router.post('/users/me/avatar', upload.single('avatar'), (req, res) => {
   res.send()
})

// Export router
module.exports = router