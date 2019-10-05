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

Task.findByIdAndDelete('5d8fd2c0b61d90c5f539434f').then((task) => {
   console.log(task)

   return Task.countDocuments({ completed: false })
}).then((result) => {
   console.log(result)
}).catch((error) => {
   console.log(error)
})