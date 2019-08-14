const fs = require('fs')

// JavaScript Object
const book = {
   title: 'Ego is the enemy',
   author: 'Ryan Holiday'
}

// Write a new JSON data file in the file system:
const bookJSON = JSON.stringify(book)
fs.writeFileSync('1-json.json', bookJSON)

// Load in JSON data file with the file system:
const dataBuffer = fs.readFileSync('1-json.json')
// console.log(dataBuffer)                // To view the buffer data in binary code
// console.log(dataBuffer.toString())     // Converts buffer data into string
const dataJSON = dataBuffer.toString()
const data = JSON.parse(dataJSON)
console.log(data.title)


///////////////////////////////////////////////////////
// NOTES
///////////////////////////////////////////////////////

// Convert JavaScript Object into a JSON string data:
// const bookJSON = JSON.stringify(book)
// console.log(bookJSON)

// Convert JSON string data into JavaScript Object:
// const parsedData = JSON.parse(bookJSON)
// console.log(parsedData)
// Access to the JavaScript Object properties:
// console.log(parsedData.author)