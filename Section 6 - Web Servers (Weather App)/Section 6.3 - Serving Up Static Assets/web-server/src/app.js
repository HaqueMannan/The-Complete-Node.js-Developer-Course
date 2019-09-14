const path = require('path')
const express = require('express')

// Provided by node wrapper main function
console.log(__dirname)
console.log(__filename)
// Path module to perform string manipulation
console.log(path.join(__dirname, '../public'))

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')

// Serve up the public directory assets
app.use(express.static(publicDirectoryPath))

// Server Routes

// This root route will never get called because of express.static will serve the index.html file from the public folder which is a special name for web servers and will be loaded instead as the root file. We could get rid of this code as it serves no purpose. This has been left to demonstrate how the index.html static file been served to the root rather than this route handler.
app.get('', (req, res) => {
   res.send('<h1>Weather</h1>')
})

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
// HTML Files have been added to the public directory
// The routes for '/help' and '/about' have been deleted.