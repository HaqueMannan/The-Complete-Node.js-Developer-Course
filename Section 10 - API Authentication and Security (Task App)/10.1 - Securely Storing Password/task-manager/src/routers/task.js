const express = require('express')
const Task = require('../models/task')

// Create new router
const router = new express.Router()

// Resource Reading Endpoints
router.get('/tasks', async (req, res) => {
   try {
      const tasks = await Task.find({})
      res.send(tasks)
   } catch (error) {
      res.status(500).send()
   }
})

router.get(('/tasks/:id'), async (req, res) => {
   const _id = req.params.id

   try {
      const task = await Task.findById(_id)

      if(!task) {
         return res.status(404).send()
      }

      res.send(task)
   } catch (error) {
      res.status(500).send()
   }
})

// Resource Creating Endpoints
router.post('/tasks', async (req, res) => {
   const task = new Task(req.body)

   try {
      await task.save()
      res.status(201).send(task)
   } catch (error) {
      res.status(400).send(error)
   }
})

// Resource Updating Endpoints
router.patch('/tasks/:id', async (req, res) => {
   const updates = Object.keys(req.body)
   const allowedUpdates = ['description', 'completed']
   const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

   if(!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' })
   }

   try {
      // The findByIdAndUpdate method below bypasses middleware as it directly interacts with the database
      // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

      // Updated mongoose code to stop bypassing middleware code:
      const task = await Task.findById(req.params.id)

      updates.forEach((update) => task[update] = req.body[update])

      await task.save()

      if(!task) {
         return res.status(404).send()
      }

      res.send(task)
   } catch (error) {
      res.status(400).send(error)
   }
})

// Resource Deleting Endpoints
router.delete('/tasks/:id', async (req, res) => {
   try {
      const task = await Task.findByIdAndDelete(req.params.id)

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