// CRUD Operations (create, read, update and delete)

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())

// Binary vs String representation
console.log(id.id, id.id.length)   // Binary ID, 12 bytes
console.log(id.toHexString(), id.toHexString().length)   // String Representation ID, 24 bytes

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
   if(error) {
      return console.log('Unable to connect to the database!')
   }

   const db = client.db(databaseName)

   // Insert a single document
   db.collection('users').insertOne({
      _id: id,
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