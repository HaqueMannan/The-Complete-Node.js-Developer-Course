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

// Start up the server on localhost:3000
app.listen(3000, () => {
   console.log('Server is up on port 3000')
})

///////////////////////////////////////////////////////
// CHALLENGE - Create a partial for the footer
///////////////////////////////////////////////////////
// 1. Setup the template for the footer partial "Created by {{ name }}"
// 2. Render the partial at the bottom of all three pages
// 3. Test your work by visiting all three pages

// Run the command node src/app.js to start the server and visit http://localhost:3000/ and click on each navigation link to test your work.


///////////////////////////////////////////////////////
// SOLUTION
///////////////////////////////////////////////////////
// A new partials file created called footer.hbs
// The index.hbs, about.hbs and help.hbs files were updated to include the partials.