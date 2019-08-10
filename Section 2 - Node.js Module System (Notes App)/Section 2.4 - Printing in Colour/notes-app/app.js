const getNotes = require('./notes.js')

const msg = getNotes()
console.log(msg)


///////////////////////////////////////////////////////
// CHALLENGE - Install and use the chalk library:
///////////////////////////////////////////////////////

// 1. Install version 2.4.1 of chalk
// 2. Load chalk into app.js
// 3. Use it to print the string “Success!” to the console in green
// 4. Test your work
// 5. Bonus: use chalk documentation to play around with other styles e.g. make text bold and inverse.


///////////////////////////////////////////////////////
// SOLUTION
///////////////////////////////////////////////////////
// In the terminal within the root directory of project, run the command: npm install chalk@2.4.1
const chalk = require('chalk');
console.log(chalk.green('Success'))
console.log(chalk.blue.bgYellow.bold.inverse('Hello World!'))
// In the terminal within the root directory of project, run the command: node app.js