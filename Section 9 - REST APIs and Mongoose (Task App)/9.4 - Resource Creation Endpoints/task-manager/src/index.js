const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req, res) => {
   // console.log(req.body)
   // res.send('testing!')

   const user = new User(req.body)

   user.save().then(() => {
      res.status(201).send(user)
   }).catch((error) => {
      // res.status(400)               // Update Status code
      // res.send(error)               // Send Error response
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

app.listen(port, () => {
   console.log('Server is up on port ' + port)
})


///////////////////////////////////////////////////////
// CHALLENGE - Setup the task creation endpoint
///////////////////////////////////////////////////////
// 1. Create a separate file for the task model (load it into index.js)
// 2. Create the task creation endpoint (handle success and error)
// 3. Test the endpoint from Postman with both good and bad data
//    - ensure script npm run dev is running and the database server is also running
//    - Run the POST URL in postman to make a API request to the servers
//    - Refresh the database in Robo 3T and view data in task-manager-api database, task collections


///////////////////////////////////////////////////////
// SOLUTION
///////////////////////////////////////////////////////
// The solution for the task model is added in the src/models/task.js file
// The solution for the task creation endpoint is added above