const path = require('path')
const express = require('express')

const app = express()

// Serve up the public directory assets
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

// Server Routes
app.get('/weather', (req, res) => {
   res.send('Weather Page')
})

// Start up the server on localhost:3000
app.listen(3000, () => {
   console.log('Server is up on port 3000')
})


///////////////////////////////////////////////////////
// CHALLENGE - Create two more HTML files
///////////////////////////////////////////////////////
// 1. Create a html page for about with "About" title
// 2. Create a html page for help with "Help" title
// 3. Remove the old route handler for both
// 4. Visit both in the browser to test your work

// Run the command node src/app.js to start the server and visit http://localhost:3000/about.html and http://localhost:3000/help.html to test your work.

///////////////////////////////////////////////////////
// SOLUTION
///////////////////////////////////////////////////////
