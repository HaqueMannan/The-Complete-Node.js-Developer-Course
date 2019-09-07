///////////////////////////////////////////////////////
// CHALLENGE - Create a reusable function for getting forecasts
///////////////////////////////////////////////////////
// 1. Setup the 'forecast' function for getting the forecast
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - low level error, pass string for error
//    - Coordinates error, pass string for error
//    - Success, pass forecast string data


///////////////////////////////////////////////////////
// SOLUTION
///////////////////////////////////////////////////////
const request = require('request')

const forecast = (latitude, longitude, callback) => {
   const url = 'https://api.darksky.net/forecast/774f2be3dbdbff72e8bab9cf673a2e70/' + encodeURIComponent(latitude) + ',' + + encodeURIComponent(longitude) + '?units=si&lang=en'

   request({url: url, json: true}, (error, response) => {
      if (error) {
         callback('Unable to connect to the weather service!', undefined)
      } else if (response.body.error) {
         callback('Unable to find location.', undefined)
      }
      else {
         callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
      }
   })
}

module.exports = forecast