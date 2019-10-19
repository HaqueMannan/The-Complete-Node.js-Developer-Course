const users = []

// addUser - track a new user
const addUser = ({ id, username, room }) => {
   // Clean the data
   username = username.trim().toLowerCase()
   room = room.trim().toLowerCase()

   // Validate data
   if (!username || !room) {
      return {
         error: 'Username and room are required!'
      }
   }

   // Check for existing user
   const existingUser = users.find((user) => {
      return user.room === room && user.username === username     // return true if match
   })

   // Validate username
   if (existingUser) {
      return {
         error: 'Username is in use!'
      }
   }

   // Store user
   const user = { id, username, room}
   users.push(user)
   return { user }
}


// removeUser - stop tracking a user when the user leaves
const removeUser = (id) => {
   // Find array index of existing user
   const index = users.findIndex((user) => user.id === id)        // return index number of matching item

   // Validate user match
   if (index !== -1) {
      // remove items from an array by its index and return the removed user object extracted
      return users.splice(index, 1)[0]
   }
}


// getUser - fetch an existing user's data
const getUser = (id) => {
   // Find user object that matches id
   return users.find((user) => user.id === id)
}


// getUsersInRoom - fetch a complete list of all users in a specific room
const getUsersInRoom = (room) => {
   // Clean the data - not required as the server will provide the room name
   // room = room.trim().toLowerCase()

   // Find all user objects that matches room
   return users.filter((user) => user.room === room)
}

module.exports = {
   addUser,
   removeUser,
   getUser,
   getUsersInRoom
}