// CRUD Operations (create, read, update and delete)

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
   if(error) {
      return console.log('Unable to connect to the database!')
   }

   const db = client.db(databaseName)

   // Read one document:
   db.collection('users').findOne({ name: 'Allan' }, (error, user) => {
      if(error) {
         console.log('Unable to fetch')
      }

      console.log(user)
   })

   // Read one document using new ObjectID:
   db.collection('users').findOne({ _id: new ObjectID("5d892d01f8545a050784f6f7") }, (error, user) => {
      if(error) {
         console.log('Unable to fetch')
      }

      console.log(user)
   })

   // Read multiple documents - the cursor object:
   db.collection('users').find({ age: 28 }).toArray((error, users) => {
      if(error) {
         console.log('Unable to fetch')
      }

      console.log(users)
   })

   db.collection('users').find({ age: 28 }).count((error, count) => {
      console.log(count)
   })
})