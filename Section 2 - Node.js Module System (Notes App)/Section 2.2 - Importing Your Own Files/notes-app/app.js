///////////////////////////////////////////////////////
// NOTES
///////////////////////////////////////////////////////
// When we load in JavaScript files, the file is executed.
// Therefore the console will log utils.js as the first string which appears in the utils.js file (i.e. it executes all of the code in utils.js file). It will then go onto execute the next code in app.js which is to log the firstName variable i.e. John Doe.
// The firstName variable gets its value from the require function. The require function returns the value assigned from the module.exports that we defined in the utils.js file which is the name variable. Thus, 'John Doe' is now the value for our firstName variable. 
// Variables within app.js is independent from the utils.js file as they have different scope and therefore we could have used name for the above variable name within the app.js file without receiving any error messages.

// 1. EXPORT VARIABLE EXAMPLE
// const firstName = require('./utils.js')
// console.log(firstName)

// 2. EXPORT FUNCTION EXAMPLE
const add = require('./utils.js')
const sum = add(1, 2)
console.log(sum)



///////////////////////////////////////////////////////
// CHALLENGE - Define and use a function in a new file:
///////////////////////////////////////////////////////

// 1. Create a new file called notes.js
// 2. Create getNotes function that returns “Your notes…”
// 3. Export getNotes function
// 4. From app.js load in and call the function printing the message to the console


///////////////////////////////////////////////////////
// SOLUTION
///////////////////////////////////////////////////////
const getNotes = require('./notes.js')
const msg = getNotes()
console.log(msg)