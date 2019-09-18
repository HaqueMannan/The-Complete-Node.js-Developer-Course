// ES5 Standard Function:
const greeter = (name) => {
   console.log('Hello ' + name)
}

greeter('Andy')       // returns Hello Andrew
greeter()               // returns Hello undefined

// ES6 Default Parameter:
const greeter2 = (name = 'User', age) => {
   console.log('Hello ' + name)
}

greeter2()              // returns Hello User
greeter2('Andy')          // Returns Hello Andy

// Default value when destructuring:
const product = {label:"Notepad", stock:260}

const transaction = (type, { label, stock } = {}) => {
   console.log(type, label, stock)
}

transaction('Order')

const transactionAlt = (type, { label, stock = 0 } = {}) => {
   console.log(type, label, stock)
}

transactionAlt('Order')
transactionAlt('Order', product)