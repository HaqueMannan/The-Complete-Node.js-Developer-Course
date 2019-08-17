const fs = require('fs')
const chalk = require('chalk')


// Add Notes Function:
const addNote = (title, body) => {
   const notes = loadNotes()

   // Check for Duplicates
   const duplicateNote = notes.find((note) => note.title === title)

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