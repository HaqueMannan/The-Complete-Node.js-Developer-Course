// CRUD Operations (create, read, update and delete)

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
   if(error) {
      return console.log('Unable to connect to the database!')
   }

   const db = client.db(databaseName)

   // Insert a single document
   db.collection('users').insertOne({
      name: 'Allan',
      age: 28
   }, (error, result) => {
      if(error) {
         console.log('Unable to insert a user')
      }

      console.log(result.ops)
   })

   // Bulk insert multiple documents
   db.collection('users').insertMany([
      {
         name: 'Ben',
         age: 30
      },
      {
         name: 'Daisy',
         age: 18
      }
   ], (error, result) => {
      if(error) {
         console.log('Unable to insert documents!')
      }

      console.log(result.ops)
   })

   ///////////////////////////////////////////////////////
   // SOLUTION
   ///////////////////////////////////////////////////////
   db.collection('tasks').insertMany([
      {
         description: 'Clean the house',
         completed: true
      },
      {
         description: 'Renew car insurance',
         completed: false
      },
      {
         description: 'Pot plants',
         completed: false
      }
   ], (error, result) => {
      if(error) {
         console.log('Unable to insert documents')
      }

      console.log(result.ops)
   })
})

///////////////////////////////////////////////////////
// CHALLENGE - Insert 3 tasks into a new tasks collection
///////////////////////////////////////////////////////
// 1. Use insertMany to insert the documents
//    - description (string), completed (boolean)
// 2. Setup the callback to handle error or print ops
// 3. Run the script
// 4. Refresh the database in Robo 3T and view data in task collections

// Use node mongodb.js to run the script. Once run, press control + c on the keyboard to end the script.