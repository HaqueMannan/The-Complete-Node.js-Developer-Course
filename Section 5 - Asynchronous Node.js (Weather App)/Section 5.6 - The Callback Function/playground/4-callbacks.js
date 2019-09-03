// A callback function is a function we provide as an argument to another function with the intention of having it called later on.

// A Asynchronous callback pattern:
setTimeout(()=> {
   console.log('Two seconds are up')
}, 2000)

// Synchronous callback pattern:
const names = ['Andy', 'Beth', 'Cathy']
const shortNames = names.filter((name) => {
   return name.length <=4 
})


// Custom Defined Function without a callback:
const geocode = (address) => {
   const data = {
      latitude: 0, 
      longitude: 0
   }

   return data
}

const data = geocode('London')
console.log(data)                      // returns {latitude: 0, longitude} in the terminal.


// Custom Defined Function without a callback, but using asynchronous code:
const geocode2 = (address) => {
   setTimeout(() => {
      const data = {
         latitude: 0, 
         longitude: 0
      }

      return data
   }, 2000)
}

const data2 = geocode2('London')
console.log(data2)                     // returns undefined as we are not returning any data to geocode2.


// Custom Defined Function with callback:
const geocode3 = (address, callback) => {
   setTimeout(() => {
      const data3 = {
         latitude: 0, 
         longitude: 0
      }

      callback(data3)
   }, 2000)
}

geocode3('London', (data3) => {
   console.log(data3)                   // returns {latitude: 0, longitude} in the terminal.
})


///////////////////////////////////////////////////////
// CHALLENGE - Mess around with the callback pattern
///////////////////////////////////////////////////////
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate 2 second delay
// 3. After the 2 seconds are up, call the callback function with the sum
// 4. Test your work!


///////////////////////////////////////////////////////
// SOLUTION
///////////////////////////////////////////////////////
const add = (a, b, callback) => {
   setTimeout(() => {
      callback(a + b)
   }, 2000)
}

add(1, 4, (sum) => {
   console.log(sum)     // should print: 5
})