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

io.on('connection', () => {
   console.log('New WebSocket connection')
})

server.listen(port, () => {
   console.log(`Server is up on port ${port}!`)
})


///////////////////////////////////////////////////////
// SOCKET.IO FURTHER INFORMATION
///////////////////////////////////////////////////////
// Express behind the scenes creates the HTTP server but we do not have access to it to pass into socket.io. We refactor the code so that we have access to the raw HTTP server in order to pass into socket.io. Our server now supports WebSockets.
// .on() takes in two arguments, the name of the event and a function to run when that event occurs. The connection event will fire the callback function whenever the server gets a new connection.
// We now have socket.io setup on the server. We now need to use it on the client inside of our web application. When we create a socket.io to work with a server it also sets up a file to be served up that clients can access, which we do in the index.html file using the <script> tag within the <body> section. 
// We can then create our own client side JavaScript file that can use the socket.io.js library to call the io() function to connect. We would load this JavaScript file into the index.html file. This will now allow clients to connect to the sever and when connected (refresh localhost:3000) the connection event will be triggered printing 'New WebSocket connection' to the terminal.
// This means the server is setup with WebSocket support correctly and it also means that clients are able to connect to it. With this in place, our server can facilitate real-time communication.