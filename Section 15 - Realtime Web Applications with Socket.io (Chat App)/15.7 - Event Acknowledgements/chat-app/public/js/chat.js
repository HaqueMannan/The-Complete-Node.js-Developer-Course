const socket = io()

socket.on('message', (message) => {
   console.log(message)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
   e.preventDefault()
   const message = e.target.elements.message.value

   // socket.emit('sendMessage', message, (message) => {
   //    // Event Acknowledgement triggered when acknowledged by the server event listener .on() method.
   //    // We have access to the data sent back from the server e.g. message (we could call this anything).
   //    console.log('The message was delivered!', message)
   // })
   socket.emit('sendMessage', message, (error) => {
      if(error) {
         return console.log(error)
      }

      console.log('The message was delivered!')
   })
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
      }, () => {
         console.log('Location shared!')
      })
   })
})