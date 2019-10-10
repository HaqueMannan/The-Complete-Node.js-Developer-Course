// Function Example 1:
// const calculateTip = (total, tipPercent) => {
//    const tip = total * tipPercent
//    return total + tip               // Success Case
//    // return total + tip + total    // Failure Case
// }

// Function Example 1 Refactored:
// const calculateTip = (total, tipPercent) => total + (total * tipPercent)

// Function Example 1 Modified to Add Default Value for Test Case 2:
const calculateTip = (total, tipPercent = .25) => total + (total * tipPercent)

module.exports = {
   calculateTip
}