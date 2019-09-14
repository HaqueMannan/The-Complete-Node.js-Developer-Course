// Load express library to use the express function to create a express application
const express = require('express')

// Create express application and store in variable which we can call methods on
const app = express()

// Route Representation for the .get() method first string argument/parameter:
// app.com           --> the domain is considered the root route which is represented as an empty string ''
// app.com/help      --> to route a request to the about page we would use '/help' string
// app.com/about     --> to route a request to the about page we would use '/about' string

// GET request to return a response when following a specific url to the root route
app.get('', (req, res) => {
   res.send('Hello express!')
})

// Additional GET request to return a response when following a specific url to the /help route
app.get('/help', (req, res) => {
   res.send('Help Page')
})

///////////////////////////////////////////////////////
// SOLUTION
///////////////////////////////////////////////////////
app.get('/about', (req, res) => {
   res.send('About Page')
})

app.get('/weather', (req, res) => {
   res.send('Weather Page')
})

// Start up the server on port 3000
app.listen(3000, () => {
   console.log('Server is up on port 3000')
})



///////////////////////////////////////////////////////
// CHALLENGE - Setup two new routes
///////////////////////////////////////////////////////
// 1. Setup an about route and render a page title
// 2. Setup a weather route and render a page title
// 3. Test your work by visiting both in the browser

// Run the command node src/app.js to start the server and visit http://localhost:3000/about and http://localhost:3000/weather to test your work.