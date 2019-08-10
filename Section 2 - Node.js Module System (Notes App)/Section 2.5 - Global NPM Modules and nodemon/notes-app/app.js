const getNotes = require('./notes.js')

const msg = getNotes()
console.log(msg)


///////////////////////////////////////////////////////
// NOTES
///////////////////////////////////////////////////////
// Installing a npm package globally is exactly the same as how we would normally install packages locally, however, we would add the -g flag in our terminal command to indicate the installation to be global.
// Installing packages globally will allow us to run the command in our terminal without having to be within our application directory to run the command. Furthermore, the package will not appear in our package.json and package-lock.json file.
// For Example - installing nodemon which is described as "a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.":
// npm install nodemon@1.19.1 -g
// Once installed we can start to use nodemon by running the command:
// nodemon app.js

// We have installed nodemon locally as it is advisable to install packages locally rather than globally.
// If installed locally, to run the command we need to navigate to the nodemon.js file located in node_modules in order to execute the script:
// ./node_modules/nodemon/bin/nodemon.js app.js

// To terminate the nodemon process, we should press control + c on our keyboard within the terminal running the nodemon process.