const chalk = require('chalk')
const yargs = require('yargs')
const getNotes = require('./notes.js')


///////////////////////////////////////////////////////
// NOTES
///////////////////////////////////////////////////////
// When using require, good practice to load in order of:
// Core Modules, NPM Packages and then Own Files.
// Yargs is a great utility package for parsing command line arguments. 

// Comparing and contrast the below commands in the terminal to see the difference between yargs and process outputs:
// node app.js
// node app.js add --title:"This is my title"
// console.log(process.argv)
// console.log(yargs.argv)

// By default, yargs is at version 1.0.0 (run the command in the terminal node app.js --version)
// To customise the yargs version we can use the version function e.g. yargs.version('1.1.0')

// We can output the argv within the handler as it will have access to this from the function.


///////////////////////////////////////////////////////
// NOTES APP CODE
///////////////////////////////////////////////////////
// Distinct Commands: add, remove, read, list

// Customise yargs version
yargs.version('1.1.0')

// Create add command
yargs.command({
   command: 'add',
   describe: 'Add a new note',
   builder: {
      title: {
         describe: 'Note title',
         demandOption: true,
         type: 'string'
      },
      body: {
         describe: 'Note body',
         demandOption: true,
         type: 'string'
      }
   },
   handler: function(argv) {
      console.log('Adding a new note!', argv)
      console.log('Title: ' + argv.title)
      console.log('Body: ' + argv.body)
   }
})

// Create remove command
yargs.command({
   command: 'remove',
   describe: 'Remove a note',
   handler: function() {
      console.log('Removing the note!')
   }
})

// Create list command
yargs.command({
   command: 'list',
   describe: 'List your notes',
   handler: function() {
      console.log('Listing out all notes!')
   }
})

// Create read command
yargs.command({
   command: 'read',
   describe: 'Read a note',
   handler: function() {
      console.log('Reading a note!')
   }
})

// If we required to view the yargs.argv parsed command line argument output, we need to call on the yargs.argv command so that yargs knows to parse the command line arguments:
console.log(yargs.argv)
// If we do not need to access yargs.argv, we can call on parse() function to run without any output (note that if we output the argv in the command handler then this will display the parsed output).
yargs.parse()




///////////////////////////////////////////////////////
// CHALLENGE - Add two commands:
///////////////////////////////////////////////////////

// 1. Add an option to Yargs.
// 2. Setup a body option for the add command
// 3. Configure the option with a description, make it required and set the type to string
// 4. Log the body value in the handler function
// 5. Test your work!


///////////////////////////////////////////////////////
// SOLUTION
///////////////////////////////////////////////////////
// Solution above within the add command, options object builder property.
// Test by running terminal command:
// 1) node app.js add --title="My title"
// This should fail and the terminal print out Missing required argument: body
// 2) node app.js add --title="My title" --body:"This is the body text"
// This should console log both the title and body options user input value i.e. "This is my title" and "This is my body text"