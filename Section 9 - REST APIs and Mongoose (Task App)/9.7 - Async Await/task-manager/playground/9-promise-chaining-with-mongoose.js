require('../src/db/mongoose')
const User = require('../src/models/user')
const Task = require('../src/models/task')

User.findByIdAndUpdate('5d8f98836f90e20c70583db5', { age: 1 }).then((user) => {
   console.log(user)

   return User.countDocuments({ age: 1 })
}).then((result) => {
   console.log(result)
}).catch((error) => {
   console.log(error)
})


///////////////////////////////////////////////////////
// CHALLENGE - Mess around with promise chaining
///////////////////////////////////////////////////////
// 1. Load task model
// 2. Remove a given task by id:
// 3. Get and print the total number of incomplete tasks
// 4. Test your results by running node playground/9-promise-chaining-with-mongoose.js command in the terminal

///////////////////////////////////////////////////////
// SOLUTION
///////////////////////////////////////////////////////
Task.findByIdAndDelete('5d8fd2c0b61d90c5f539434f').then((task) => {
   console.log(task)

   return Task.countDocuments({ completed: false })
}).then((result) => {
   console.log(result)
}).catch((error) => {
   console.log(error)
})