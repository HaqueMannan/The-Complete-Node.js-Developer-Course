const express = require('express')
require('./db/mongoose')

// Load Routers
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

// Create Express app
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// Register Routers
app.use(userRouter)
app.use(taskRouter)

// Start server and listen on port
app.listen(port, () => {
   console.log('Server is up on port ' + port)
})


///////////////////////////////////////////////////////
// Advanced Relationships Topic Example:
///////////////////////////////////////////////////////
const Task = require('../src/models/task')
const User = require('../src/models/user')

const main = async () => {
   // Task to get the whole user document using ref
   const task = await Task.findById('5d97a501f927b506217d97ff')         // _id field
   await task.populate('owner').execPopulate()
   console.log(task.owner)

   // User to get every tasks document using virtual 7 ref
   const user = await User.findById('5d97a4f9f927b506217d97fd')         // owner field
   await user.populate('tasks').execPopulate()
   console.log(user.tasks)
}

main()