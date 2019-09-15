const path = require('path')
const express = require('express')

const app = express()

// Setting up template engine - handlebars using hbs express
app.set('view engine', 'hbs')

// Serve up the public directory assets
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))


// Server Routes
app.get('', (req, res) =>{
   res.render('index', {
      title: 'Weather',          // Inject values into .hbs view templates file to use
      name: 'John Doe'
   })                            // Render a .hbs view file to serve up as dynamic template response
})

app.get('/about', (req, res) => {
   res.render('about', {
      title: 'About',
      name: 'John Doe'
   })
})

///////////////////////////////////////////////////////
// SOLUTION
///////////////////////////////////////////////////////
// The help.hbs file is created within the views folder
app.get('/help', (req, res) => {
   res.render('help', {
      title: 'Help',
      helpText: 'This is some helpful text.'
   })
})


app.get('/weather', (req, res) => {
   res.send('Weather Page')
})

// Start up the server on localhost:3000
app.listen(3000, () => {
   console.log('Server is up on port 3000')
})


///////////////////////////////////////////////////////
// CHALLENGE - Create a template for help page
///////////////////////////////////////////////////////
// 1. Setup a help template to render a help message to the screen
// 2. Setup the help route and render the template with an example message
// 3. Visit the route in the browser and see your help message print

// Run the command node src/app.js to start the server and visit http://localhost:3000/help.html to test your work.