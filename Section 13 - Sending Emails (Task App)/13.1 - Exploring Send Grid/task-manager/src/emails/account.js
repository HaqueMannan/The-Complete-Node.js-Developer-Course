const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

sgMail.send({
   to: 'j.doe@email.com',
   from: 'j.doe@email.com',
   subject: 'Test Email',
   text: 'This is a test email.'
})