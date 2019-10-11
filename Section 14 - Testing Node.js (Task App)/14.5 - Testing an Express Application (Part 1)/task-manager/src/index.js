const express = require('express')
require('./db/mongoose')

// Load Routers
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

// Create Express app
const app = express()
const port = process.env.PORT

app.use(express.json())

// Register Routers
app.use(userRouter)
app.use(taskRouter)

// Start server and listen on port
app.listen(port, () => {
   console.log('Server is up on port ' + port)
})