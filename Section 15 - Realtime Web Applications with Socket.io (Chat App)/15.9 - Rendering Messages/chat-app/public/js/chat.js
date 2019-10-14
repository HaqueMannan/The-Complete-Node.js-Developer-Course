const socket = io()

// Elements:
// Convention of using $ sign to let us know what we have in the variable is a DOM element. Makes it easier to write and read our code.
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')    // Location to render templates.

// Mustache Templates - require access to the innerHTML in order to render the template correctly.
const messageTemplate = document.querySelector('#message-template').innerHTML

socket.on('message', (message) => {
   console.log(message)
   const html = Mustache.render(messageTemplate, {       // Step 1 - render HTML using template
      message: message                                   // key:value pairs where key is from the template.
   })
   $messages.insertAdjacentHTML('beforeend', html)       // Step 2 - insert HTML to element
})

$messageForm.addEventListener('submit', (e) => {
   e.preventDefault()

   // Disable the button once the form has been submitted i.e. cannot press the button or use enter key.
   // setAttribute() takes in two string arguments, an attribute and attribute value.
   $messageFormButton.setAttribute('disabled', 'disabled')

   const message = e.target.elements.message.value

   socket.emit('sendMessage', message, (error) => {
      // Enable the button on acknowledgement callback regardless of error:
      // removeAttribute() takes an argument of the attribute name to remove.
      $messageFormButton.removeAttribute('disabled')
      $messageFormInput.value = ''                       // Reset value of form input.
      $messageFormInput.focus()                          // Set focus back on the form input.

      if(error) {
         return console.log(error)
      }

      console.log('The message was delivered!')
   })
})

$sendLocationButton.addEventListener('click', () => {
   // Check if geolocation supported by the browser
   if(!navigator.geolocation) {
      return alert('Geolocation is not supported by your browser.')
   }

   $sendLocationButton.setAttribute('disabled', 'disabled')

   // Send location data to the server to emit to all clients
   navigator.geolocation.getCurrentPosition((position) => {
      socket.emit('sendLocation', {
         latitude: position.coords.latitude,
         longitude: position.coords.longitude
      }, () => {
         $sendLocationButton.removeAttribute('disabled')
         console.log('Location shared!')
      })
   })
})