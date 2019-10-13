const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')

const app = express()
const server = http.createServer(app)        // Refactored to explicitly create http Express app server.
const io = socketio(server)                  // Socket.io expects to be called with the raw HTTP server.

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

// let count = 0

io.on('connection', (socket) => {                  // io.on() used for connection.
   console.log('New WebSocket connection')

   // socket.emit('countUpdated', count)           // Transmit event and data to the client.
   // socket.on('increment', () => {               // Receive event and data from the client.
   //    count++                                   // Increment the count by +1.
   //    // socket.emit('countUpdated', count)     // Transmit the updated count to a single connected client.
   //    io.emit('countUpdated', count)            // Transmit the updated count to all connected client.
   // })

   socket.emit('message', 'Welcome!')
   socket.broadcast.emit('message', 'A new user has joined!')

   socket.on('sendMessage', (message, callback) => {
      const filter = new Filter()

      if(filter.isProfane(message)) {
         return callback('Profanity is not allowed!')
      }

      io.emit('message', message)
      callback()                                   // Acknowledge the event received from the client.
      // callback('Delivered')                     // Send data back to the client.
   })

   socket.on('sendLocation', (coords, callback) => {
      io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
      callback()
   })

   socket.on('disconnect', () => {                 // socket.on() used for disconnect, inside of io.on()
      io.emit('message', 'A user has left!')
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

// SOCKET.IO EMITTING EVENTS:
// There are three ways to emit events:
//    1) socket.emit() emits the event to the single client that we are referring to in the socket object 
//       (i.e. current connected client).
//    2) io.emit() emits the event to every single connected client.
//    3) socket.broadcast.emit() emits the event to every other connected client except the current client.
// Broadcasting events will allow us to send a message such as a new user has joined to everyone except the new user who is joining.
// The .emit() continues to work normally and the only difference is that .broadcast is going to send the event to every client except the particular client (i.e. socket) triggering the event.
// To run some code when a given client gets disconnected (e.g. client browser closed) we use socket.on() inside of our connection callback. We only ever going to use io.on() for the connection and not on the disconnection event. The disconnect is a built-in event and we must match the name correctly.
// There is no need to emit either of the connection and disconnect event from the client as these are built in events and so the socket.io library takes control over actual emitting these. All we have to do is setup the listener.
// We do not need to use .broadcast when emitting to every client on the disconnect event. This is because the disconnected client will never receive the emitted message sent to every client who is still connected.

// SOCKET.IO EVENT ACKNOWLEDGEMENT:
// Event acknowledgement allows the receiver of the event to acknowledge that it received and processed the event. With an acknowledgement the sender will be notified that the event was indeed delivered successfully.
// This works in both directions:
// server (emit) -> client (receive) --acknowledgement--> server
// client (emit) -> server (receive) --acknowledgement--> client
// Acknowledgements are optional. To add an acknowledgement, we pass in a final callback function as an argument to the .emit() method. This function will run when the event is acknowledged.
// To send the event acknowledgement back to the emitter, on the .on() event listener method, the callback function requires a second argument called callback (or something similar). We can call on this callback() to send the acknowledgement back to the emitter to trigger the callback function setup on the .emit() method.
// We can choose to provide some data back with the acknowledgement by passing in as many arguments in the callback() function as we want to.
// An acknowledgement requires to be implemented on both the client and server side JavaScript. Therefore, whoever is emitting the event sets up a callback function and whoever is receiving the event receives a callback function that needs to call and it can optionally send data back and forth.
// Acknowledgements are great for validation. For example to prevent messages with profanity from being sent. NPM has a package called bad-words which allows us to achieve this.