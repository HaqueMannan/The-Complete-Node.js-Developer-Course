// Load in the function we want to test:
const { calculateTip } = require('../src/math')

// Test case to verify that the function is working as expected:
test('Should calculate total with tip', () => {
   const total = calculateTip(10, .3)

   // Manual method of asserting expected value:
   // if(total !== 13) {
   //    throw new Error(`Total tip should be 13. Got ${total}`)
   // }

   // Using Jest Expect API Library to assert:
   expect(total).toBe(13)
})

test('Should calculate total with default tip', () => {
   const total = calculateTip(10)
   expect(total).toBe(12.5)
})