const bcrypt = require('bcryptjs')

const myFunction = async ( ) => {
   const password = 'Example123!$'
   const hashedPassword = await bcrypt.hash(password, 8)
   console.log(password)
   console.log(hashedPassword)

   const isMatch = await bcrypt.compare('example123!$', hashedPassword)
   console.log(isMatch)
}

myFunction()