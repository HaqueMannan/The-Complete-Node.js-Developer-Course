const socket = io()

socket.on('message', (message) => {
   console.log(message)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
   e.preventDefault()
   // const message = document.querySelector('input').value    // issue if more than one input element.
   // On the e object we can call .target which represents the form i.e. #message-form. The .element allows us to select an element on the target form by its name attribute i.e. .message. We use .value to retrieve the form's message element value.
   const message = e.target.elements.message.value

   socket.emit('sendMessage', message)
})


///////////////////////////////////////////////////////
// CHALLENGE - Send a welcome message to new users
///////////////////////////////////////////////////////
// 1. Have the server emit "message" when new client connects
//    - Send "Welcome!" as the event data
// 2. Have clients listen for "message" event and print to the console
// 3. Test your work!

///////////////////////////////////////////////////////
// CHALLENGE - Allow clients to send messages
///////////////////////////////////////////////////////
// 1. Create a form with an input and button
// 2. Setup event listener for the form submissions
//    - Emit "sendMessage" with input string as message data
// 3. Have server listen for "sendMessage"
//    - Send message to all connected clients
// 3. Test your work!


///////////////////////////////////////////////////////
// SOLUTION
///////////////////////////////////////////////////////
// Solutions is provided in index.js, index.html and chat.js files.
// Open two browsers connected to local host to test solutions.