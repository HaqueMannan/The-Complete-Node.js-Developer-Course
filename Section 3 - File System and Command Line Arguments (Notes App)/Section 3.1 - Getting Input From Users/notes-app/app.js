const chalk = require('chalk')
const getNotes = require('./notes.js')



///////////////////////////////////////////////////////
// NOTES
///////////////////////////////////////////////////////
// We can use the process global variable object argv property to retrieve command line arguments passed in. the argv property returns an array and will always returns 2 strings in that array:
// The first string provides the path to the node.js executable.
// The second string provides the path to the app.js file.
// The strings after are the command line arguments passed in when we run the node command (try as a test node app.js John)
// We can use JavaScript bracket notation to retrieve a specific value from an array. JavaScript uses zero indexing:
console.log(process.argv[2])

// Try running the command in terminal: node app.js add
const command = process.argv[2]
if (command === 'add') {
   console.log('Adding note!')
} else if (command === 'remove') {
   console.log('Removing note!')
}