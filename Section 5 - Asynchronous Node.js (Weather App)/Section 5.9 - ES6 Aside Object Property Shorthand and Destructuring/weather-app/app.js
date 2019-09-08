const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const location = process.argv[2]

if(!location) {
   console.log('Please provide a location')
} else {
   geocode(location, (error, { latitude, longitude, location }) => {
      if(error) {
         return console.log('Error:', error)
      }

      forecast(latitude, longitude, (error, forecastData) => {
         if (error) {
            return console.log('Error:', error)
         }
         console.log(location)
         console.log(forecastData)
      })
   })
}


///////////////////////////////////////////////////////
// CHALLENGE - Use both destructuring and property shorthand in weather app
///////////////////////////////////////////////////////
// 1. Use destructuring in app.js, forecast.js and geocode.js
// 2. Use property shorthand in forecast.js and geocode.js
// 3. Test your work and ensure app still works


///////////////////////////////////////////////////////
// SOLUTION
///////////////////////////////////////////////////////
// Solution applied to app.js, forecast.js and geocode.js files.
// Run the command node app.js London or node app.js "New York".