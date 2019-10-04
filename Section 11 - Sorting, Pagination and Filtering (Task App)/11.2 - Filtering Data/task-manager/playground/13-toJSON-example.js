// Object
const pet = {
   name: 'Felix'
}

// The toJSON function gets called when stringify an object
// We get access to 'this' and can return back the object or manipulate it.
pet.toJSON = function () {
   console.log(this)
   // return this                            // Returns the object as is
   return {}                              // Returns an empty object
}


// Console log stringify object: 
console.log(JSON.stringify(pet))          // returns {"name":"felix"} but toJSON can manipulate this value                                               to return an empty object {}