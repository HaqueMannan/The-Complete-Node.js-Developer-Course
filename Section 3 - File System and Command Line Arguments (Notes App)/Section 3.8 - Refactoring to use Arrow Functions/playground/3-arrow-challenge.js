///////////////////////////////////////////////////////
// CHALLENGE - Create method to get incomplete tasks
///////////////////////////////////////////////////////

// 1. Define getTasksToDo method
// 2. Use filter to return just the incomplete tasks (arrow function)
// 3. Test your work by running the script


const tasks = {
   tasks: [{
      text: 'Grocery shopping',
      completed: true
   }, {
      text: 'Clean yard',
      completed: false
   }, {
      text: 'Film course',
      completed: false
   }],


   ///////////////////////////////////////////////////////
   // SOLUTION
   ///////////////////////////////////////////////////////
   // The filter method loops/iterate through an existing array and will create a new array, returning only the array items that meet the criteria.

   // Example 1 - arrow function:
   getTasksToDo() {
      const tasksToDo = this.tasks.filter((task) => {
         return task.completed === false
      })
      return tasksToDo
   },

   // Example 2 - shorthand syntax:
   getTasksToDoAlt() {
      return this.tasks.filter((task) => task.completed === false)
   }
}


console.log(tasks.getTasksToDo())
console.log(tasks.getTasksToDoAlt())