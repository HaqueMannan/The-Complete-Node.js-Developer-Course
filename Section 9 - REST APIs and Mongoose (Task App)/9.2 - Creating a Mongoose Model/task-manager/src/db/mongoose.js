const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', { 
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true
})

const User = mongoose.model('User', {
   name: {
      type: String
   },
   age: {
      type: Number
   }
})

const me = new User({
   name: 'Simon',
   age: 35
})

me.save().then(() => {
   console.log(me)
}).catch((error) => {
   console.log('Error!', error)
})


///////////////////////////////////////////////////////
// CHALLENGE - Create a model for tasks
///////////////////////////////////////////////////////
// 1. Define the model with description and completed fields
// 2. Create a new instance of the model
// 3. Save the model to the database
// 4. Run the script and refresh the database in Robo 3T and view data in task-manager-api database, task         collections

// Use node src/db/mongoose.js to run the script. Once run, press control + c on the keyboard to end the script.


///////////////////////////////////////////////////////
// SOLUTION
///////////////////////////////////////////////////////
const Task = mongoose.model('Task', {
   description: {
      type: String
   },
   completed: {
      type: Boolean
   }
})

const task = new Task({
   description: 'Learn the mongoose library',
   completed: false
})

task.save().then(() => {
   console.log(task)
}).catch((error) => {
   console.log(error)
})