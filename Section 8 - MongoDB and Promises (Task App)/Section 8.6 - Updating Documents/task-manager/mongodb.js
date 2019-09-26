// CRUD Operations (create, read, update and delete)

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
   if(error) {
      return console.log('Unable to connect to the database!')
   }

   const db = client.db(databaseName)

   // Update one document:
   db.collection('users').updateOne({ 
      _id: new ObjectID("5d892d01f8545a050784f6f8")
   }, {
      $set: {
         name: 'Nikki'
      }
   }).then((result) => {
      console.log(result)
   }).catch((error) => {
      console.log(error)
   })


   const updatePromise = db.collection('users').updateOne({ 
      _id: new ObjectID("5d892d01f8545a050784f6f8")
   }, {
      $inc: {
         age: 1               // Increment with a positive number and decrement with a negative number
      }
   })

   updatePromise.then((result) => {
      console.log(result)
   }).catch((error) => {
      console.log(error)
   })

   ///////////////////////////////////////////////////////
   // SOLUTION
   ///////////////////////////////////////////////////////
   // Update multiple documents:
   db.collection('tasks').updateMany({
      completed: false
   }, {
      $set: {
         completed: true
      }
   }).then((result) => {
      console.log(result.modifiedCount)
   }).catch((error) => {
      console.log(error)
   })
})

///////////////////////////////////////////////////////
// CHALLENGE - Use updateMany to complete all tasks
///////////////////////////////////////////////////////
// 1. Check the documentation for updateMany
// 2. Setup the call with the query and the updates
// 3. Use promise methods to setup the success/error handlers
// 4. Run the script and refresh the database in Robo 3T and view data in task collections

// Use node mongodb.js to run the script. Once run, press control + c on the keyboard to end the script.