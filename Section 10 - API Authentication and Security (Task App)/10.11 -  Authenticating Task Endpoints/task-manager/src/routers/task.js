const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')

// Create new router
const router = new express.Router()

// Resource Reading Endpoints
router.get('/tasks', auth, async (req, res) => {
   try {
      // const tasks = await Task.find({ owner: req.user._id })
      // res.send(tasks)
      await req.user.populate('tasks').execPopulate()       // Alt method to above commented code.
      res.send(req.user.tasks)
   } catch (error) {
      res.status(500).send()
   }
})

router.get(('/tasks/:id'), auth, async (req, res) => {
   const _id = req.params.id

   try {
      const task = await Task.findOne({ _id, owner: req.user._id })

      if(!task) {
         return res.status(404).send()
      }

      res.send(task)
   } catch (error) {
      res.status(500).send()
   }
})

// Resource Creating Endpoints
router.post('/tasks', auth, async (req, res) => {
   // const task = new Task(req.body)
   const task = new Task({
      ...req.body,
      owner: req.user._id
   })

   try {
      await task.save()
      res.status(201).send(task)
   } catch (error) {
      res.status(400).send(error)
   }
})

// Resource Updating Endpoints
router.patch('/tasks/:id', auth, async (req, res) => {
   const updates = Object.keys(req.body)
   const allowedUpdates = ['description', 'completed']
   const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

   if(!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' })
   }

   try {
      const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

      if(!task) {
         return res.status(404).send()
      }

      updates.forEach((update) => task[update] = req.body[update])
      await task.save()

      res.send(task)
   } catch (error) {
      res.status(400).send(error)
   }
})

// Resource Deleting Endpoints
router.delete('/tasks/:id', auth, async (req, res) => {
   try {
      const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

      if(!task) {
         return res.status(404).send()
      }

      res.send(task)
   } catch (error) {
      res.status(500).send(error)
   }
})

// Export router
module.exports = router