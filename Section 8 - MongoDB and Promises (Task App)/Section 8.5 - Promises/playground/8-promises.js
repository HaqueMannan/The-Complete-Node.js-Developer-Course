// CALLBACK PATTERN EXAMPLE
const doWorkCallback = (callback) => {
   setTimeout(() => {
      // callback('This is an error!', undefined)        // For an error
      callback(undefined, [1, 4, 7])                  // For a success
   }, 2000)
}

doWorkCallback((error, result) => {
   if(error) {
      return console.log(error)
   }

   console.log(result)
})

// PROMISE EXAMPLE
const doWorkPromise = new Promise((resolve, reject) => {
   setTimeout(() => {
      resolve([1, 4, 7])                     // For a success
      // reject('Things went wrong!')               // For an error
   }, 2000)
})

doWorkPromise.then((result) => {
   console.log('Success', result)
}).catch((error) => {
   console.log('Error', error)
});


///////////////////////////////////////////////////////
// TERMINOLOGY
///////////////////////////////////////////////////////
// When we first create the promise, the promise is known as pending. So the promise above pending for the two seconds before resolve or reject is called. Therefore, a promise is pending until either resolve or reject is executed. If resolve is called, the promise is considered fulfilled and if reject is called the promise is considered rejected.

//                               fulfilled
//                               /
// Promise        -- pending -->
//                               \
//                               rejected

// Therefore, in the above we have a promise called doWorkPromise and it is pending for two seconds and then it is fulfilled. If we switch the above by commenting out the resolve and uncommenting the reject, we would say we have a doWorkPromise and it is pending for two seconds and then it is rejected.
// It is important to be familiar with the pending, fulfilled and rejected terms.