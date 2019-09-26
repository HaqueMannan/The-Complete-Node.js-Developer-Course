// CRUD Operations (create, read, update and delete)

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
   if(error) {
      return console.log('Unable to connect to the database!')
   }

   const db = client.db(databaseName)

   // Delete one document:
   db.collection('users').deleteOne({ 
      _id: new ObjectID("5d892d01f8545a050784f6f8")
   }).then((result) => {
      console.log(result)
   }).catch((error) => {
      console.log(error)
   })

   // Delete multiple documents:
   db.collection('users').deleteMany({ 
      age: 28
   }).then((result) => {
      console.log(result)
   }).catch((error) => {
      console.log(error)
   })

   ///////////////////////////////////////////////////////
   // SOLUTION
   ///////////////////////////////////////////////////////
   db.collection('tasks').deleteOne({ 
      description: "Clean the house"
   }).then((result) => {
      console.log(result.deletedCount)
   }).catch((error) => {
      console.log(error)
   })
})

///////////////////////////////////////////////////////
// CHALLENGE - Use deleteOne to complete a tasks
///////////////////////////////////////////////////////
// 1. Grab the description for the task you want to remove
// 2. Setup the call with the query
// 3. Use promise methods to setup the success/error handlers
// 4. Run the script and refresh the database in Robo 3T and view data in task collections

// Use node mongodb.js to run the script. Once run, press control + c on the keyboard to end the script.