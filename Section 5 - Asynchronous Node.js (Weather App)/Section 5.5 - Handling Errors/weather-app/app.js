const request = require('request')

const url = 'https://api.darksky.net/forecast/774f2be3dbdbff72e8bab9cf673a2e70/37.8267,-122.4233?units=si&lang=en'

request({url: url, json: true}, (err, response) => {
   // console.log(error)

   if (error) {
      console.log('Unable to connect to the weather service!')
   } else if (response.body.error) {
      console.log('Unable to find location.')
   }
   else {
      console.log(response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
   }
})

const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/London.json?access_token=pk.eyJ1IjoieXR1YmUtdHV0b3JpYWxzIiwiYSI6ImNrMDFhaHNiNTBvYnczbXF0bm15aXVxNnQifQ.F9o3SEHg8NI0-qQS5Gt8ng&limit=1'

request({url: geocodeURL, json: true}, (err, response) => {
   ///////////////////////////////////////////////////////
   // SOLUTION
   ///////////////////////////////////////////////////////
   if(error) {
      console.log('Unable to connect to the locations services!')
   } else if (response.body.features.length === 0) {
      console.log('Unable to find location. Try another search.')
   } else {
      const longitude = response.body.features[0].center[0]
      const latitude = response.body.features[0].center[1]
      console.log(latitude, longitude)
   }
})


///////////////////////////////////////////////////////
// CHALLENGE - Handle errors for geocoding request
///////////////////////////////////////////////////////
// 1. Setup an error handler for low-level errors
// 2. Test by disabling network request and running the app
// 3. Setup error handling for no matching results
// 4. Test by altering the search term and running the app