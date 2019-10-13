const socket = io()

socket.on('message', (message) => {
   console.log(message)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
   e.preventDefault()
   const message = e.target.elements.message.value

   socket.emit('sendMessage', message)
})

document.querySelector('#send-location').addEventListener('click', () => {
   // Check if geolocation supported by the browser
   if(!navigator.geolocation) {
      return alert('Geolocation is not supported by your browser.')
   }

   // Send location data to the server to emit to all clients
   navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position)
      socket.emit('sendLocation', {
         latitude: position.coords.latitude,
         longitude: position.coords.longitude
      })
   })
})