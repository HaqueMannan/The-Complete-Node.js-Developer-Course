const generateMessage = (username, text) => {
   return {
      username,
      text,
      createdAt: new Date().getTime()
   }
}

const generateLocationMessage = (username, url) => {
   return {
      username,
      url,
      createdAt: new Date().getTime()
   }
}

module.exports = {
   generateMessage,
   generateLocationMessage
}


///////////////////////////////////////////////////////
// SOCKET.IO SERVER FURTHER INFORMATION
///////////////////////////////////////////////////////
// WORKING WITH TIME:
// The above function will be used to setup the object we want to pass to our .emit() event.
// We could have passed in two arguments one for the string message and one for the date or we could create a single object with different properties i.e. text and date and pass this object as the second argument. Either method would work.
// We can use the JavaScript built-in new Date() to create a new date object.
// We can string different methods on the date object such as:
//    - .toString() method converts the date to a string representation of date and time.
//    - .getDate() method gets the date e.g. 31/01/2019 = 31
//    - .getTime() method to get the time e.g 1234567890. 
// The getTime method returns back a time which is a timestamp i.e. a representation of that point in time (of the above .toString() value). It is the number of milliseconds since 01 January 1970 00:00. This is also known as the Unix epoch and so 0 will represent that point in time. Positive numbers are time in the future from that unix epoch point in time while negative numbers are in the past.
// Timestamps are great for transferring between systems because it is nothing more than a number and this number is universally understood by pretty much every programming language and so it is easy to work with.
// We can either create a variable and store the date/time stamp value or we can do this at once without storing it in a variable as seen above.
// We can export this function so that we can generate a object to pass to our .emit() second argument and have access to all of its properties. This will reduce the amount of duplicate code keeping things nice and clean.
// JavaScript does not provide a easy way to format our dates in a way we might want. This is where the moment library comes into play as it provides us all of the tools necessary to format time. The documentation can be found on: https://momentjs.com/
// We aleady loaded in the moments library in our index.html using the <script> tag.