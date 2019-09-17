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

///////////////////////////////////////////////////////
// SOLUTION
///////////////////////////////////////////////////////
app.get('/weather', (req, res) => {
   if(!req.query.address) {
      return res.send({
         error: 'You must provide an address'
      })
   }
   res.send({
      address: req.query.address
   })
})

app.get('/products', (req, res) => {
   if(!req.query.search) {
      return res.send({
         error: 'You must provide a search term'
      })
   }
   // Using return above is the common pattern to stop the function running the below code if the above statement returns true and executes. A Http request has a single request that goes to the server and a single response sent back. If we try to send two response we would get the error within the terminal of "Cannot set header after they are sent to the client".
   console.log(req.query)                 // .query is an object that holds the url query strings.
   console.log(req.query.search)                 // We can specify a specific key value to return.
   res.send({
      products: []
   })
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
// CHALLENGE - Update weather endpoint to accept address
///////////////////////////////////////////////////////
// 1. No address? Send back an error message
// 2. Address? Send back the static JSON
//    - Add address property onto JSON which returns the provided address
// 3. Test your work. Visit /weather and /weather?address=london

// Run the command node src/app.js to start the server and visit http://localhost:3000/weather and http://localhost:3000/weather?address=london.