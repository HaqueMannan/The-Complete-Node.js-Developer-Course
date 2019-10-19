const socket = io()

// Elements:
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')    // Location to render templates.
const $usersInRoomList = document.querySelector('#sidebar')

// Mustache Templates - require access to the innerHTML in order to render the template correctly.
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

// Options:
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

const autoscroll = () => {
   // New message element
   const $newMessage = $messages.lastElementChild

   // Height of the new message (including margin for total height)
   const newMessageStyles = getComputedStyle($newMessage)
   const newMessageMargin = parseInt(newMessageStyles.marginBottom)
   // console.log(newMessageStyles, newMessageMargin)
   const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

   // Visible height
   const visibleHeight = $messages.offsetHeight

   // Height of messages container
   const containerHeight = $messages.scrollHeight

   // How far has the user scrolled?
   const $scrollOffset = $messages.scrollTop + visibleHeight

   // Auto-scroll conditional logic
   if (containerHeight - newMessageHeight <= $scrollOffset) {
      $messages.scrollTop = containerHeight
   }
}

socket.on('message', (message) => {
   const html = Mustache.render(messageTemplate, {
      username: message.username,
      message: message.text,
      createdAt: moment(message.createdAt).format('h:mm a')
   })
   $messages.insertAdjacentHTML('beforeend', html)
   autoscroll()
})

socket.on('locationMessage', (message) => {
   console.log(message)
   const html = Mustache.render(locationMessageTemplate, {
      username: message.username,
      url: message.url,
      createdAt: moment(message.createdAt).format('h:mm a')
   })
   $messages.insertAdjacentHTML('beforeend', html)
   autoscroll()
})

socket.on('roomData', ({ room, users }) => {
   const html = Mustache.render(sidebarTemplate, {
      room,
      users
   })
   $usersInRoomList.innerHTML = html
})

$messageForm.addEventListener('submit', (e) => {
   e.preventDefault()

   $messageFormButton.setAttribute('disabled', 'disabled')

   const message = e.target.elements.message.value

   socket.emit('sendMessage', message, (error) => {
      $messageFormButton.removeAttribute('disabled')
      $messageFormInput.value = ''
      $messageFormInput.focus()

      if (error) {
         return console.log(error)
      }

      console.log('The message was delivered!')
   })
})

$sendLocationButton.addEventListener('click', () => {
   // Check if geolocation supported by the browser
   if (!navigator.geolocation) {
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

socket.emit('join', { username, room }, (error) => {
   if (error) {
      alert(error)
      location.href = '/'
   }
})