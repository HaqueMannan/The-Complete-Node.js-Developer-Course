const request = require('request')

const url = 'https://api.darksky.net/forecast/774f2be3dbdbff72e8bab9cf673a2e70/37.8267,-122.4233'

request({url: url}, (err, response) => {
   //console.log(response)
   const data = JSON.parse(response.body)
   console.log(data)
   console.log(data.currently)
})