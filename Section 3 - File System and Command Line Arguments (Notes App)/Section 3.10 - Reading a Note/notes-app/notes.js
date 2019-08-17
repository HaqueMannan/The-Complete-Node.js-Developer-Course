const fs = require('fs')
const chalk = require('chalk')

// Read Notes Function:
const getNotes = () => 'Your notes...'


// Add Notes Function:
const addNote = (title, body) => {
   const notes = loadNotes()

   // Check for Duplicates
      // The filter method is not the most efficient as it will continue to look through the whole array even if it finds a duplicate, whereas we would want it to stop as soon as it finds a duplicate.  
   // const duplicateNotes = notes.filter((note) => note.title === title)

   // if (duplicateNotes.length === 0) {
   //    // Append Objects and properties to notes array.
   //    notes.push({
   //       title: title, 
   //       body: body
   //    })

   //    // console.log(notes)      // Testing to see the notes object
   //    saveNotes(notes)           // Save the notes
   //    console.log(chalk.green.inverse('New note added!'))
   // } else {
   //    console.log(chalk.red.inverse('Note title is taken!'))
   // }

      // We can use find array method as a more efficient code. The find method uses the same criteria as the filter, however, it will stop once it has found the first match i.e. first duplicate found:
   const duplicateNote = notes.find((note) => note.title === title)

      // We could also use the if statement of (duplicateNote === undefined) as the logical test.
   if (!duplicateNote) {
      // Append Objects and properties to notes array.
      notes.push({
         title: title, 
         body: body
      })

      // console.log(notes)      // Testing to see the notes object
      saveNotes(notes)           // Save the notes
      console.log(chalk.green.inverse('New note added!'))
   } else {
      console.log(chalk.red.inverse('Note title is taken!'))
   }
}


// Remove Notes Function:
const removeNote = (title) => {
   // console.log(title)      // Testing to see the title returned to delete
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
   getNotes: getNotes,
   addNote: addNote,
   removeNote: removeNote,
   listNotes: listNotes,
   readNote: readNote
}