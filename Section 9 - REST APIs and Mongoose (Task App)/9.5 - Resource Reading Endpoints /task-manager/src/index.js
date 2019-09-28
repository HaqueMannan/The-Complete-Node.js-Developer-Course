const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// Resource Reading Endpoints
app.get('/users', (req, res) => {
   User.find({}).then((users) => {
      res.send(users)
   }).catch((error) => {
      res.status(500).send()
   })
})

app.get(('/users/:id'), (req, res) => {
   // console.log(req.params)
   const _id = req.params.id

   User.findById(_id).then((user) => {
      if(!user) {
         return res.status(404).send()
      }

      res.send(user)
   }).catch((error) => {
      res.status(500).send()
   })
})

///////////////////////////////////////////////////////
// SOLUTION
///////////////////////////////////////////////////////
app.get('/tasks', (req, res) => {
   Task.find({}).then((tasks) => {
      res.send(tasks)
   }).catch((error) => {
      res.status(500).send()
   })
})

app.get(('/tasks/:id'), (req, res) => {
   // console.log(req.params)
   const _id = req.params.id

   Task.findById(_id).then((task) => {
      if(!task) {
         return res.status(404).send()
      }

      res.send(task)
   }).catch((error) => {
      res.status(500).send()
   })
})

// Resource Creating Endpoints
app.post('/users', (req, res) => {
   const user = new User(req.body)

   user.save().then(() => {
      res.status(201).send(user)
   }).catch((error) => {
      res.status(400).send(error)      // Chain the two above
   })
})

app.post('/tasks', (req, res) => {
   const task = new Task(req.body)

   task.save().then(() => {
      res.status(201).send(task)
   }).catch((error) => {
      res.status(400).send(error)
   })
})

// Start server and listen on port
app.listen(port, () => {
   console.log('Server is up on port ' + port)
})


///////////////////////////////////////////////////////
// CHALLENGE - Setup the task reading endpoint
///////////////////////////////////////////////////////
// 1. Create an endpoint for fetching all tasks
// 2. Create an endpoint for fetching a task by its id
// 3. Setup new requests in Postman
// 3. Test the endpoint from Postman with both good and bad data
//    - ensure script npm run dev is running and the database server is also running
//    - Run the POST URL in postman to make a API request to the servers
//    - Refresh the database in Robo 3T and view data in task-manager-api database, task collections