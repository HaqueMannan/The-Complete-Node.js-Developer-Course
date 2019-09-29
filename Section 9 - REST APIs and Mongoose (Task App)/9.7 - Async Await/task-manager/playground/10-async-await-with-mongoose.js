require('../src/db/mongoose')
const User = require('../src/models/user')
const Task = require('../src/models/task')


const updateAgeAndCount = async (id, age) => {
   const user = await User.findByIdAndUpdate(id, { age })
   const count = await User.countDocuments({ age })

   return count
}

updateAgeAndCount('5d8f98836f90e20c70583db5', 2).then((count) => {
   console.log(count)   // This could have been called anything we want, but we called it count because we                          knew the result was going to be the count because that is what gets returned                             from the async function.
}).catch((error) => {
   console.log(error)
})


///////////////////////////////////////////////////////
// CHALLENGE - Use async/await
///////////////////////////////////////////////////////
// 1. Create deleteTaskAndCount as an async function
//    - Accept id of task to remove
// 2. Use await to delete task and count up incomplete tasks
// 3. Return the count
// 4. Call the function and attach then/catch to log result
// 4. Test your results by running node playground/10-async-await-with-mongoose.js command in the terminal


///////////////////////////////////////////////////////
// SOLUTION
///////////////////////////////////////////////////////
const deleteTaskAndCount = async (id) => {
   const task = await Task.findByIdAndDelete(id)
   const count = await Task.countDocuments({ completed: false })

   return count
}

deleteTaskAndCount('5d8fec6eb61d90c5f5394477').then((result) => {
   console.log(result)
}).catch((error) => {
   console.log(error)
})