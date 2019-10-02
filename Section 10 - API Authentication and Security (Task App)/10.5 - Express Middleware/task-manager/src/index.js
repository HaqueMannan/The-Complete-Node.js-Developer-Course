const express = require('express')
require('./db/mongoose')

// Load Routers
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

// Create Express app
const app = express()
const port = process.env.PORT || 3000

// Register Express Middleware
app.use((req, res, next) => {
   if(req.method === 'GET') {
      console.log(req.method, req.path)
      res.send('GET requests are disabled')
   } else {
      next()
   }
})

///////////////////////////////////////////////////////
// SOLUTION
///////////////////////////////////////////////////////
// app.use((req, res, next) => {
//    res.status(503).send('Site is currently down. Check back soon!')
// })

app.use(express.json())

// Register Routers
app.use(userRouter)
app.use(taskRouter)

// Start server and listen on port
app.listen(port, () => {
   console.log('Server is up on port ' + port)
})


///////////////////////////////////////////////////////
// CHALLENGE - Setup middleware for maintenance mode
///////////////////////////////////////////////////////
// 1. Register a new middleware function
// 2. Send back a maintenance message with a 503 status code
// 3. To test from Postman and confirm status/message shows:
//    - ensure script npm run dev is running and the database server is also running
//    - Run the POST Create user URL in postman to make a API request to the servers