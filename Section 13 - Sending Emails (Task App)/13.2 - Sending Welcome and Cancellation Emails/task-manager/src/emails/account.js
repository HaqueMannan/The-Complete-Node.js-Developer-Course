const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) => {
   sgMail.send({
      to: email,
      from: 'j.doe@email.com',
      subject: 'Welcome to the Task Manager App!',
      text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
   })
}

const sendCancellationEmail = (email, name) => {
   sgMail.send({
      to: email,
      from: 'j.doe@email.com',
      subject: 'Sorry to see you go!',
      text: `Goodbye, ${name}. I hope to see you back sometime soon.`
   })
}

module.exports = {
   sendWelcomeEmail,
   sendCancellationEmail
}