const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// Resource Reading Endpoints
app.get('/users', async (req, res) => {
   try {
      const users = await User.find({})
      res.send(users)
   } catch (error) {
      res.status(500).send()
   }
})

app.get(('/users/:id'), async (req, res) => {
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

app.get('/tasks', async (req, res) => {
   try {
      const tasks = await Task.find({})
      res.send(tasks)
   } catch (error) {
      res.status(500).send()
   }
})

app.get(('/tasks/:id'), async (req, res) => {
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
app.post('/users', async (req, res) => {
   const user = new User(req.body)

   try {
      await user.save()
      res.status(201).send(user)
   } catch (error) {
      res.status(400).send(error)
   }
})

app.post('/tasks', async (req, res) => {
   const task = new Task(req.body)

   try {
      await task.save()
      res.status(201).send(task)
   } catch (error) {
      res.status(400).send(error)
   }
})

// Resource Updating Endpoints
app.patch('/users/:id', async (req, res) => {
   const updates = Object.keys(req.body)
   const allowedUpdates = ['name', 'email', 'password', 'age']
   const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

   if(!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!'})
   }

   try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

      if(!user) {
         return res.status(404).send()
      }

      res.send(user)
   } catch (error) {
      res.status(400).send(error)
   }
})

///////////////////////////////////////////////////////
// SOLUTION
///////////////////////////////////////////////////////
app.patch('/tasks/:id', async (req, res) => {
   const updates = Object.keys(req.body)
   const allowedUpdates = ['description', 'completed']
   const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

   if(!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' })
   }

   try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

      if(!task) {
         return res.status(404).send()
      }

      res.send(task)
   } catch (error) {
      res.status(400).send(error)
   }
})

// Start server and listen on port
app.listen(port, () => {
   console.log('Server is up on port ' + port)
})


///////////////////////////////////////////////////////
// CHALLENGE - Allow for task updates
///////////////////////////////////////////////////////
// 1. Setup route handler
// 2. Send error if unknown updates
// 3. Attempt to update the task
//    - Handle task not found
//    - Handle validation errors
//    - Handle success
// 4. Test the endpoint from Postman with both good and bad data
//    - ensure script npm run dev is running and the database server is also running
//    - Run the PATCH URL in postman to make a API request to the servers
//    - Refresh the database in Robo 3T and view data in task-manager-api database, task collections