const express = require('express')
require('./db/mongoose')

// Load Routers
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

// Create Express app
const app = express()

app.use(express.json())

// Register Routers
app.use(userRouter)
app.use(taskRouter)

module.exports = app