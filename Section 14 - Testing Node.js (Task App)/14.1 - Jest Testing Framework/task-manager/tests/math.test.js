// If a test does not throw an error, this is considered a pass.
test('Hello World!', () => {

})

// If a test does throw an error, this is considered a failure.
test('This should fail', () => {
   throw new Error('Failure!')
})