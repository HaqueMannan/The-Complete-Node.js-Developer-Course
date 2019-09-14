const express = require('express')

const app = express()

// Server Routes
app.get('', (req, res) => {
   res.send('<h1>Weather</h1>')        // Send HTML if it detects a html syntax value
})

app.get('/help', (req, res) => {
   res.send({
      name: 'Elle',
      age: 20
   })                                  // Send JSON if it detects a object value
})

app.get('/about', (req, res) => {
   res.send([
      {name: 'Lucy'}, 
      {name: 'Gary'}
   ])                                  // Send JSON if it detects an array object value
})

app.get('/weather', (req, res) => {
   res.send('Weather Page')            // Send text if it detects a string value
})

// Start up the server on localhost:3000
app.listen(3000, () => {
   console.log('Server is up on port 3000')
})