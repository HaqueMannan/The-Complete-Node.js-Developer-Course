const https = require('https')

const url = 'https://api.darksky.net/forecast/774f2be3dbdbff72e8bab9cf673a2e70/40,-75?units=si&lang=en'

const request = https.request(url, (response) => {
   let data = ''

   response.on('data', (chunk) => {
      console.log(chunk)
      data = data + chunk.toString()
   })

   response.on('end', () => {
      console.log(data)
      const body = JSON.parse(data)
      console.log(body)
   })
})

request.on('error', (error) => {
   console.log('An error: ', error)
})

request.end()