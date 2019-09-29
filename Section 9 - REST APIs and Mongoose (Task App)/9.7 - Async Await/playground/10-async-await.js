// Regular Promise Function
const add = (a, b) => {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         if(a < 0 || b < 0) {
            return reject('Numbers must be non-negative')
         }

         resolve(a + b)
      }, 2000)
   })
}


// Async Function
// const doWork = async () => {
//    throw new Error('Something went wrong')
//    return 'Andy'
// }

// console.log(doWork())            // Returns a promise with the string value i.e. Promise {'Andy'}


// Async/Await
const doWork = async () => {
   const sum = add(1, 2)
   // const sum = add(1, -2)        // Forces an error earlier and the below code will not continue to run
   const sum2 = add(sum, 3)
   // const sum3 = add(sum2, 4)
   const sum3 = add(sum2, -4)       // Forces an error because using negative.
   return sum3
}


// Run Async Function:
doWork().then((result) => {
   console.log('result', result)
}).catch((error) => {
   console.log('error', error)
})