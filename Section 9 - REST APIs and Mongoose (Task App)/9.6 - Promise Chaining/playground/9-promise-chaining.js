// Asynchronous function using promises
const add = (a, b) => {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         resolve(a + b)
      }, 2000)
   })
}

add(1, 2).then((sum) => {
   console.log(sum)
}).catch((error) => {
   console.log(error)
})


// How do we run the two add functions one after the other, the second using the sum from the first.

// Method 1: nesting asynchronous functions - not ideal as complicated level nesting and duplicate code:
add(1, 2).then((sum1) => {
   console.log(sum1)

   add(sum1, 3).then((sum2) => {
      console.log(sum2)
   }).catch((error) => {
      console.log(error)
   })
}).catch((error) => {
   console.log(error)
})


// Method 2 - Promise Chaining
add(1, 2).then((s) => {
   console.log(s)

   return add(s, 3)
}).then((s2) => {
   console.log(s2)
}).catch((error) => {
   console.log(error)
})