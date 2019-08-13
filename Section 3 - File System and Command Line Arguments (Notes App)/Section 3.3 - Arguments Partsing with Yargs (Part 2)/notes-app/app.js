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
         describe: 'Note title'
      }
   },
   handler: function(argv) {
      console.log('Adding a new note!', argv)
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


///////////////////////////////////////////////////////
// CHALLENGE - Add two commands:
///////////////////////////////////////////////////////

// 1. Setup command to support "list" command (print placeholder message for now)
// 2. Setup command to support "read" command (print placeholder message for now)
// 3. Test your work by running both commands and ensure correct output


///////////////////////////////////////////////////////
// SOLUTION
///////////////////////////////////////////////////////

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

// Test Commands
console.log(yargs.argv)