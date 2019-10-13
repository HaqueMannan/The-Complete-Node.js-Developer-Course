// Connect to the WebSocket enabled server
const socket = io()

// Receive event from server
socket.on('countUpdated', (count) => {
   console.log('The count has been updated!', count)
})

// Send an event to the server
document.querySelector('#increment').addEventListener('click', () => {
   console.log('Clicked!')
   socket.emit('increment')
})


///////////////////////////////////////////////////////
// SOCKET.IO CLIENT FURTHER INFORMATION
///////////////////////////////////////////////////////
// SOCKET.IO EVENTS & COMMUNICATION:
// The io() function allows the client to connect to the WebSocket enabled server. We store this object on a variable so that we can get access to its methods.
// The .on() method allows the client to receive an event that the server is sending to the client. This takes in two arguments. The first is the name of the event and the second is a callback function to run when that event occurs. The name of the event must match exactly with the name we picked on the .emit() method on the server.
// The console.log() on the client will print the message on the client's (browser) JavaScript developer tools Console.
// The client can access all arguments after the first event argument passed into the .emit() on the server and is accessible in the callback function. The name does not have to match but the order does matter i.e. we can call count something else but this must be the first argument in the .on() callback function.
// This allows data to be transferred from server to client.
// To send data from the client to the server we can create a button in our index.html and provide an id so that we can target that button and link a JavaScript function on that button's click event. The document.querySelector() allows us to select a HTML element by its id (#) or class(.) and the .addEventListener() allows us to add an event to listen for on the selected element and trigger the callback function.
// We use the .emit() method on the client and provide a name for this event as the first argument followed by any additional arguments to transfer any data to the server. The server can use .on() to receive the event that the client is sending to the server. This is the reverse of the server to client.
// In the above we do not need to send any data because the server knows the current count and it is just going to add +1 to it and so this is enough for the client to just send the event.