const calculateTip = (total, tipPercent = .25) => total + (total * tipPercent)

const fahrenheitToCelsius = (temp) => {
   return (temp - 32) / 1.8
}

const celsiusToFahrenheit = (temp) => {
   return (temp * 1.8) + 32
}

module.exports = {
   calculateTip,
   fahrenheitToCelsius,
   celsiusToFahrenheit
}


///////////////////////////////////////////////////////
// CHALLENGE - Test temperature conversion functions
///////////////////////////////////////////////////////
// 1. Export both functions and load them into test suite
// 2. Create "Should convert 32 F to 0 C"
// 3. Create "Should convert 0 C to 32 F"
// 4. Run npm test (Jest) to test your work.


///////////////////////////////////////////////////////
// SOLUTION
///////////////////////////////////////////////////////
// Solution for exporting added above in module.exports
// Solution for test cases added to the tests/math.test.js file