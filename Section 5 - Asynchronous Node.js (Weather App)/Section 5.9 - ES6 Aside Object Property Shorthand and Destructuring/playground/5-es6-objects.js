// Object Property Shorthand: 
// When setting up a property which its value comes from a variable of the same name.

const name = 'John'
const userAge = 28

// ES5:
const user = {
   name: name,
   age: userAge,
   location: 'London'
}

// ES6:
const user2 = {
   name,
   age: userAge,
   location: 'London'
}

console.log(user, user2)

// Object Destructuring: 
// When trying to access properties from an object. Destructuring goal is to extract object properties and their values into individual variables.

const product = {
   label: 'Red notebook',
   price: 3,
   stock: 201,
   salePrice: undefined,
   rating: 4.7             // comment/uncomment to see the default value used if property does not exist.
}

// ES5:
const ES5label = product.label
const ES5stock = product.stock
console.log(ES5label, ES5stock)

// ES6:
const {label: productLabel, stock, rating = 5} = product
console.log(productLabel, stock, rating)

// Destructuring Function Arguments:
const transaction = (type, myProduct) => {
   const {label} = myProduct
   console.log(type, label)
}

const transactionAlt = (type, {label, stock}) => {
   console.log(type, label, stock)
}

transaction('order', product)
transactionAlt('order', product)