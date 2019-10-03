const express = require('express')
const User = require('../models/user')

// Create new router
const router = new express.Router()

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

// Resource Creating Endpoints
router.post('/users', async (req, res) => {
   const user = new User(req.body)

   try {
      await user.save()
      res.status(201).send(user)
   } catch (error) {
      res.status(400).send(error)
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
      // The findByIdAndUpdate method below bypasses middleware as it directly interacts with the database
      // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

      // Updated mongoose code to stop bypassing middleware code:
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