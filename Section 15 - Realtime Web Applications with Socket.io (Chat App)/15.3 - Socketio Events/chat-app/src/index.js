const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)        // Refactored to explicitly create http Express app server.
const io = socketio(server)                  // Socket.io expects to be called with the raw HTTP server.

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

let count = 0

io.on('connection', (socket) => {
   console.log('New WebSocket connection')

   socket.emit('countUpdated', count)           // Transmit event and data to the client.
   socket.on('increment', () => {               // Receive event and data from the client.
      count++                                   // Increment the count by +1.
      // socket.emit('countUpdated', count)     // Transmit the updated count to a single connected client.
      io.emit('countUpdated', count)            // Transmit the updated count to all connected client.
   })
})

server.listen(port, () => {
   console.log(`Server is up on port ${port}!`)
})


///////////////////////////////////////////////////////
// SOCKET.IO SERVER FURTHER INFORMATION
///////////////////////////////////////////////////////
// SOCKET.IO SERVER SETUP:
// Express behind the scenes creates the HTTP server but we do not have access to it to pass into socket.io. We refactor the code so that we have access to the raw HTTP server in order to pass into socket.io. Our server now supports WebSockets.
// .on() takes in two arguments, the name of the event and a function to run when that event occurs. The connection event will fire the callback function whenever the server gets a new connection.
// We now have socket.io setup on the server. We now need to use it on the client inside of our web application. When we create a socket.io to work with a server it also sets up a file to be served up that clients can access, which we do in the index.html file using the <script> tag within the <body> section. 
// We can then create our own client side JavaScript file that can use the socket.io.js library to call the io() function to connect. We would load this JavaScript file into the index.html file. This will now allow clients to connect to the sever and when connected (refresh localhost:3000) the connection event will be triggered printing 'New WebSocket connection' to the terminal.
// This means the server is setup with WebSocket support correctly and it also means that clients are able to connect to it. With this in place, our server can facilitate real-time communication.

// SOCKET.IO EVENTS & COMMUNICATION:
// When working with socket.io and transferring data, we are sending and receiving what are called events e.g. we can send an event from the server and we want to receive that event on the client. To send an event we use the .emit on our socket object we receive from the connection callback function argument which we named socket.
// An event is made up of at least one thing, the name of the event. So there is an inbuilt event called connection but we can create a custom one e.g. countUpdatedEvent. This event is used to send the initial count to the client and it will also be used to send any changes to the count.
// To transfer data with the event from the server to client, we add another argument to the .emit() method. Anything we provide on .emit() after the first event name argument is accessible from the callback function on the client.
// To listen for an event from the client we use the .on() method on the server. This takes in two arguments. The first is the name of the event and the second is a callback function to run when that event occurs. The name of the event must match exactly with the name we picked on the .emit() method on the client.
// We now have a real-time two way communication between the server and the client using socket.io events.
// When we use .emit() method we are emitting the event to a particular (single) connection. To .emit() to every connections available we would use the io object instead of the socket object to call the .emit() method on.
// We now have a real-time two way communication between the server and the client whereby all connected clients (and not just the specific connected client triggering the event) is updated/notified in real-time with the changed data.