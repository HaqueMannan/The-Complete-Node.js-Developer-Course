console.log('Client side JavaScript file is loaded');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
   e.preventDefault()
   const location = search.value

   console.log('testing')
   console.log(location)

   ///////////////////////////////////////////////////////
   // SOLUTION
   ///////////////////////////////////////////////////////
   fetch('http://localhost:3000/weather?address=' + location).then((response) => {
      response.json().then((data) => {
         if(data.error) {
            console.log(data.error)
         } else {
            console.log(data.location)
            console.log(data.forecast)
         }
      })
   })
})

///////////////////////////////////////////////////////
// CHALLENGE - Use input value to get weather
///////////////////////////////////////////////////////
// 1. Migrate fetch call into the submit callback
// 2. Use the search text as the address query string value
// 3. Test your work. Visit http://localhost:3000/ and submit a valid and invalid value

// Run the command node src/app.js to start the server and visit http://localhost:3000/ and enter London as the input location and click the search button. Then enter ! as the input location and press the search button.