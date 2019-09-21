console.log('Client side JavaScript file is loaded');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
   e.preventDefault()
   const location = search.value

   ///////////////////////////////////////////////////////
   // SOLUTION
   ///////////////////////////////////////////////////////
   messageOne.textContent = 'Loading...'
   messageTwo.textContent = ''

   fetch('http://localhost:3000/weather?address=' + location).then((response) => {
      response.json().then((data) => {
         if(data.error) {
            messageOne.textContent = data.error
         } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
         }
      })
   })
})

///////////////////////////////////////////////////////
// CHALLENGE - Render content to paragraph
///////////////////////////////////////////////////////
// 1. Select the second <p> element from JavaScript
// 2. Just before fetch, render loading message and empty <p>
// 3. If error, render error
// 4. If no error, render location and forecast
// 3. Test your work. Visit http://localhost:3000/ and submit a valid and invalid locations

// Run the command node src/app.js to start the server and visit http://localhost:3000/ and press search without a location input. Then enter London as the input location and click the search button. Finally, enter ! as the input location and press the search button.