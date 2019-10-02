const jwt = require('jsonwebtoken')

const myFunction = async ( ) => {
   const token = jwt.sign({ _id: 'abc123' }, 'thisisanewjsonwebtoken', { expiresIn: '7 days' })
   console.log(token)

   const data = jwt.verify(token, 'thisisanewjsonwebtoken')
   console.log(data)
}

myFunction()