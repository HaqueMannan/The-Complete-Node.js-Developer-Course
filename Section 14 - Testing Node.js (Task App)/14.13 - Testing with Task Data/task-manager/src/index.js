const app = require('./app')

// Setup Port Environment Variable
const port = process.env.PORT

// Start server and listen on port
app.listen(port, () => {
   console.log('Server is up on port ' + port)
})