const fs = require('fs')

// Read Notes Function:
const getNotes = function() { 
   return 'Your notes...'
}

// Add Notes Function:
const addNote = function(title, body) {
   const notes = loadNotes()

   // Check for Duplicates
   const duplicateNotes = notes.filter(function (note) {
      return note.title === title
   })

   if (duplicateNotes.length === 0) {
      // Append Objects and properties to notes array.
      notes.push({
         title: title, 
         body: body
      })

      // console.log(notes)      // Testing to see the notes object
      saveNotes(notes)           // Save the notes
      console.log('New note added!')
   } else {
      console.log('Note title is taken!')
   }
}

// Loading Notes Function:
const loadNotes = function() {
   try {
      const dataBuffer = fs.readFileSync('notes.json')
      const dataJSON = dataBuffer.toString()
      return JSON.parse(dataJSON)
   } catch(err) {
      return []
   }
}

// Saving Notes Function:
const saveNotes = function(notes) {
   const dataJSON = JSON.stringify(notes)
   fs.writeFileSync('notes.json', dataJSON)
}


// Exporting Functions:
module.exports = {
   getNotes: getNotes,
   addNote: addNote
}