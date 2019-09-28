const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', { 
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true
})

const User = mongoose.model('User', {
   name: {
      type: String,
      required: true,
      trim: true
   },
   email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
         if(!validator.isEmail(value)) {
            throw new Error('Email is invalid')
         }
      }
   },
   ///////////////////////////////////////////////////////
   // SOLUTION
   ///////////////////////////////////////////////////////
   password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
         if(value.toLowerCase().includes('password')) {
            throw new Error('Password cannot contain "password"')
         }
      }
   },
   age: {
      type: Number,
      default: 0,
      validate(value) {
         if(value < 0) {
            throw new Error('Age must be a positive number')
         }
      }
   }
})

const me = new User({
   name: '  Simon   ',
   email: 'SIMON@SIMONEMAIL.COM   ',
   password: 'phone098!'
})

me.save().then(() => {
   console.log(me)
}).catch((error) => {
   console.log('Error!', error)
})


///////////////////////////////////////////////////////
// CHALLENGE - Add a password field to User model
///////////////////////////////////////////////////////
// 1. Setup the field as a required string
// 2. Ensure the length is greater than 6
// 3. Trim the password
// 4. Ensure that password does contain "password"
// 5. Run the script and refresh the database in Robo 3T and view data in task-manager-api database, task         collections

///////////////////////////////////////////////////////
// CHALLENGE - Add validation and sanitisation to Task model
///////////////////////////////////////////////////////
// 1. Trim the description and make it required
// 2. Make completed optional and default it to false
// 3. Run the script and refresh the database in Robo 3T and view data in task-manager-api database, task         collections

// Use node src/db/mongoose.js to run the script. Once run, press control + c on the keyboard to end the script.


///////////////////////////////////////////////////////
// SOLUTION
///////////////////////////////////////////////////////
const Task = mongoose.model('Task', {
   description: {
      type: String,
      required: true,
      trim: true
   },
   completed: {
      type: Boolean,
      default: false
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