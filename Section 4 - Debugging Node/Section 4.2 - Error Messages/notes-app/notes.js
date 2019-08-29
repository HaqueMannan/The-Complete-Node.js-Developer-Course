const fs = require('fs')
const chalk = require('chalk')


// Add Notes Function:
const addNote = (title, body) => {
   const notes = loadNotes()

   // Check for Duplicates
   const duplicateNote = notes.find((note) => note.title === title)

   ///////////////////////////////////////////////////////
   // DEBUGGING NODE.JS
   ///////////////////////////////////////////////////////
      // Debugging Node.js using Console.log to see the value of variables:
      console.log(duplicateNote)
      console.log(title)
      console.log(notes)

      // Debugging Node.js using Nodes debugger. This stops the application at a point in time which we can use the chrome developer tools to see values:
         // We can use the debugger statement multiple times in our application code to pause the application at a particular point in time.
         // When running the node terminal command we need to use 'node inspect' to pause at the debugger, else the code will run normally and will not pause. This command will open a port to the debugger tool which we can inspect our code in the Chrome browser.
         // Go to chrome://inspect/#devices page to view the Remote targets to inspect our code in the V8 Chrome debugger tool.
         // The Remote Target allows us to inspect our code in a new debugger tool window. Once the application runs from beginning to end the Remote Target will end.
         // To re-inspect the Remote Target we can use the restart command which will update the Remote Target with a inspect link to open the debugger tool again.
         // Pressing ctrl + c twice on the keyboard will end the process.
      debugger

      ///////////////////////////////////////////////////////

   if (!duplicateNote) {
      // Append Objects and properties to notes array.
      notes.push({
         title: title, 
         body: body
      })

      saveNotes(notes)           // Save the notes
      console.log(chalk.green.inverse('New note added!'))
   } else {
      console.log(chalk.red.inverse('Note title is taken!'))
   }
}


// Remove Notes Function:
const removeNote = (title) => {
   const notes = loadNotes()

   // Create new array keeping all objects where the titles do not match
   const notesToKeep = notes.filter((note) => note.title !== title)

   // Log useful message to the user
   if (notes.length > notesToKeep.length) {
      console.log(chalk.green.inverse('Note Removed!'))
      saveNotes(notesToKeep)     // Save updated notes array
   } else {
      console.log(chalk.red.inverse('No Note Found!'))
   }
}


// List Notes Function:
const listNotes = () => {
   console.log(chalk.inverse('Your Notes:'))

   const notes = loadNotes()

   notes.forEach((note) => console.log(note.title))
}


const readNote = (title) => {
   const notes = loadNotes()
   const note = notes.find((note) => note.title === title)

   if(note) {
      console.log(chalk.inverse(note.title))
      console.log(note.body)
   } else {
      console.log(chalk.red.inverse('No Note Found!'))
   }
}


// Loading Notes Function:
const loadNotes = () => {
   try {
      const dataBuffer = fs.readFileSync('notes.json')
      const dataJSON = dataBuffer.toString()
      return JSON.parse(dataJSON)
   } catch(err) {
      return []
   }
}


// Saving Notes Function:
const saveNotes = (notes) => {
   const dataJSON = JSON.stringify(notes)
   fs.writeFileSync('notes.json', dataJSON)
}


// Exporting Functions:
module.exports = {
   addNote: addNote,
   removeNote: removeNote,
   listNotes: listNotes,
   readNote: readNote
}