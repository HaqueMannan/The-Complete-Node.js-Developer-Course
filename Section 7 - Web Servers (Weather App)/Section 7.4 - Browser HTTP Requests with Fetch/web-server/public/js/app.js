console.log('Client side JavaScript file is loaded');

fetch('http://puzzle.mead.io/puzzle').then((response) => {
   response.json().then((data) => {
      console.log(data)
   })
})


///////////////////////////////////////////////////////
// CHALLENGE - Fetch weather
///////////////////////////////////////////////////////
// 1. Setup a call to fetch weather for London
// 2. Get the parse JSON response
//    - If error property, print error
//    - If no error property, print location and forecast
// 3. Test your work. Visit http://localhost:3000/

// Run the command node src/app.js to start the server and visit http://localhost:3000/ and open the console in the browser to see the response data.
// To test the error, change the fetch URL string argument to http://localhost:3000/weather?address=! to force an error.


///////////////////////////////////////////////////////
// SOLUTION
///////////////////////////////////////////////////////
fetch('http://localhost:3000/weather?address=london').then((response) => {
   response.json().then((data) => {
      if(data.error) {
         console.log(data.error)
      } else {
         console.log(data.location)
         console.log(data.forecast)
      }
   })
})