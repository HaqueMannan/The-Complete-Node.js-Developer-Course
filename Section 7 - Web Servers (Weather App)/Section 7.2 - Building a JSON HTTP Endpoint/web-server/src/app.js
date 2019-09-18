const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

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
   if(!req.query.address) {
      return res.send({
         error: 'You must provide an address!'
      })
   }

   geocode(req.query.address, (error, { latitude, longitude, location }) => {
      if(error) {
         return res.send({ error })
      }

      forecast(latitude, longitude, (error, forecastData) => {
         if(error) {
            return res.send({ error })
         }

         res.send({
            forecast: forecastData,
            location,
            address: req.query.address
         })
      })
   })
})

app.get('/products', (req, res) => {
   if(!req.query.search) {
      return res.send({
         error: 'You must provide a search term!'
      })
   }

   console.log(req.query)
   console.log(req.query.search)
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
// CHALLENGE - Wire up /weather
///////////////////////////////////////////////////////
// 1. Require geocode/forecast into app.js
// 2. Use the address to geocode
// 3. Use the coordinates to get forecast
// 4. Send back the real forecast location
// 3. Test your work. Visit /weather?address=london

// Run the command node src/app.js to start the server and visit http://localhost:3000/weather?address=london.

///////////////////////////////////////////////////////
// SOLUTION
///////////////////////////////////////////////////////
// Added utils folder containing the forecast.js and geocode.js files. Imported these files using require.
// Updated the /weather route above to use geocode and forecast to send back JSON data.