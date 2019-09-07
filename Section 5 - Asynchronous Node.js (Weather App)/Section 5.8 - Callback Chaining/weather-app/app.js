const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

///////////////////////////////////////////////////////
// SOLUTION
///////////////////////////////////////////////////////
const location = process.argv[2]

if(!location) {
   console.log('Please provide a location')
} else {
   geocode(location, (error, data) => {
      if(error) {
         return console.log('Error:', error)
      }
   
      forecast(data.latitude, data.longitude, (error, forecastData) => {
         if (error) {
            return console.log('Error:', error)
         }
         console.log(data.location)
         console.log(forecastData)
      })
   })
}


///////////////////////////////////////////////////////
// CHALLENGE - Accept location via command line argument
///////////////////////////////////////////////////////
// 1. Access the command line argument
// 2. Use the string value as the input for geocode
// 3. Only geocode if a location was provided
// 4. Test your work with a couple of locations

// Run the command node app.js London or node app.js "New York" to test the solution.