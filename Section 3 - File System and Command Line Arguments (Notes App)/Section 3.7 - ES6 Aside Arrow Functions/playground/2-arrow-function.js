// ES5 regular function:
const squareES5 = function (x) {
   return x * x
}

console.log(squareES5(2))        // Return 4 in the terminal


// ES6 arrow function - explicitly returned:
const squareES6 = (x) => {
   return x * x
}

console.log(squareES6(3))        // Return 9 in the terminal


// ES6 arrow function - implicitly returned:
const squareES6v2 = (x) => x * x

console.log(squareES6(4))        // Return 16 in the terminal


// ES5 regular function - on an object method(this keyword):
const eventES5 = {
   name: 'Birthday Party',
   printGuestList: function() {
      console.log('Guest list for ' + this.name)
   }
}

eventES5.printGuestList()        // Returns 'Guest list for Birthday Party' in the terminal


// ES6 arrow function - on an object method:
const eventES6 = {
   name: 'Birthday Party',
   printGuestList: () => {
      console.log('Guest list for ' + this.name)
   }
}

eventES6.printGuestList()        // Returns 'Guest list for undefined' in the terminal
// Arrow functions do not have access to the this keyword on method properties. It is best to use ES5 functions is this situation.


// ES6 method definition - function shorthand on an object method:
const eventES6methodDefinition = {
   name: 'Birthday Party',
   printGuestList() {
      console.log('Guest list for ' + this.name)
   }
}

eventES6methodDefinition.printGuestList()        // Returns 'Guest list for Birthday Party' in the terminal


// ES6 function on an object method - sub function:
const eventES6methodSubFunction = {
   name: 'Birthday Party',
   guestList: ['Alan', 'Beth', 'Carl'],
   printGuestList() {
      console.log('Guest list for ' + this.name),

      this.guestList.forEach(function(guest) {
         console.log(guest + ' is attending ' + this.name)
      })
   }
}

eventES6methodSubFunction.printGuestList()        // Returns e.g. 'Alan is attending undefined' in the terminal


// ES6 function on an object method - sub function ES5 fix:
const eventES6methodSubFunctionFix1 = {
   name: 'Birthday Party',
   guestList: ['Alan', 'Beth', 'Carl'],
   printGuestList() {
      that = this,

      console.log('Guest list for ' + this.name),

      this.guestList.forEach(function(guest) {
         console.log(guest + ' is attending ' + that.name)
      })
   }
}

eventES6methodSubFunctionFix1.printGuestList()     // Returns e.g. 'Alan is attending Birthday Party' in the terminal


// ES6 function on an object method - sub function ES6 arrow function fix:
const eventES6methodSubFunctionFix2 = {
   name: 'Birthday Party',
   guestList: ['Alan', 'Beth', 'Carl'],
   printGuestList() {
      console.log('Guest list for ' + this.name),

      this.guestList.forEach((guest) => {
         console.log(guest + ' is attending ' + that.name)
      })
   }
}

eventES6methodSubFunctionFix2.printGuestList()     // Returns e.g. 'Alan is attending Birthday Party' in the terminal