const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const publicDirectoryPath = path.join(__dirname, '../public')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve static assets
app.use(express.static(publicDirectoryPath))


// Server Routes
app.get('', (req, res) =>{
   res.render('index', {
      title: 'Weather',
      name: 'John Doe'
   })
})

app.get('/about', (req, res) => {
   res.render('about', {
      title: 'About',
      name: 'John Doe'
   })
})

app.get('/help', (req, res) => {
   res.render('help', {
      title: 'Help',
      name: 'John Doe',
      helpText: 'This is some helpful text.'
   })
})

app.get('/weather', (req, res) => {
   res.send('Weather Page')
})

app.get('/help/*', (req, res) => {
   res.render('404', {
      title: '404',
      name: 'John Doe',
      errorMessage: 'Help article not found.'
   })
})

app.get('*', (req, res) => {
   res.render('404', {
      title: '404',
      name: 'John Doe',
      errorMessage: 'Page not found'
   })
})

// Start up the server on localhost:3000
app.listen(3000, () => {
   console.log('Server is up on port 3000')
})

///////////////////////////////////////////////////////
// CHALLENGE - Create and render a 404 page with handlebars
///////////////////////////////////////////////////////
// 1. Setup the template to render the header and footer partials
// 2. Setup the template to render and error message in a paragraph
// 3. Render the template for both 404 routes
//       - Page not found.
//       - Help article not found.
// 4. Test your work. Visit /what and /help/data

// Run the command node src/app.js to start the server and visit http://localhost:3000/ and visit url links http://localhost:3000/what and http://localhost:3000/help/data.


///////////////////////////////////////////////////////
// SOLUTION
///////////////////////////////////////////////////////
// A new partials file created in the views folder called 404.hbs
// The app.get for * and /help/* route above have been updated to render a 404 page passing in an error message to display.