// Load in the function we want to test:
const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math')

// Test case to verify that the function is working as expected:
test('Should calculate total with tip', () => {
   const total = calculateTip(10, .3)
   expect(total).toBe(13)
})

test('Should calculate total with default tip', () => {
   const total = calculateTip(10)
   expect(total).toBe(12.5)
})

test('Should convert 32 F to 0 C', () => {
   const temp = fahrenheitToCelsius(32)
   expect(temp).toBe(0)
})

test('Should convert 0 C to 32 F', () => {
   const temp = celsiusToFahrenheit(0)
   expect(temp).toBe(32)
})

// Method 1 - Testing Asynchronous Code - done can be technically called anything but we must call this parameter so that Jest knows when to consider a test a pass/failure:
// test('Async test demo', (done) => {
//    setTimeout(() => {
//       expect(1).toBe(2)
//       done()
//    }, 2000)
// })

// Method 2 - Testing Asynchronous Code - Promises:
test('Should add two numbers', (done) => {
   add(2, 3).then((sum) => {
      expect(sum).toBe(5)
      done()
   })
})

// Method 3 - Testing Asynchronous Code - Async/Await:
test('Should add two numbers async/await', async () => {
   const sum = await add(2, 3)
   expect(sum).toBe(5)
})