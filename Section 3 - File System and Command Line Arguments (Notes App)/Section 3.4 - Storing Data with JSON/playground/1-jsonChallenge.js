///////////////////////////////////////////////////////
// CHALLENGE - Work with JSON and the File System
///////////////////////////////////////////////////////

// 1. Load and parse the JSON data
// 2. Change the name and age property using your info
// 3. Stringify the changed object and overwrite the original data
// 4. Test your work by viewing data in the JSON file


///////////////////////////////////////////////////////
// SOLUTION
///////////////////////////////////////////////////////
const fs = require('fs')

const dataBuffer = fs.readFileSync('1-jsonChallenge.json')
const dataJSON = dataBuffer.toString()
const user = JSON.parse(dataJSON)

user.name = "Beth"
user.age = 21

const userJSON = JSON.stringify(user)
fs.writeFileSync('1-jsonChallengeAnswer.json', userJSON)


// Run node 1-jsonChallenge.js in the terminal which will create a new file with the new updated data rather than overwrite the original data file.