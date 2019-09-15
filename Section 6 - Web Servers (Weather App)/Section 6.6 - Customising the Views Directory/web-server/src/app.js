const path = require('path')
const express = require('express')

const app = express()

// Define paths for Express config
const viewsPath = path.join(__dirname, '../templates')
const publicDirectoryPath = path.join(__dirname, '../public')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

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