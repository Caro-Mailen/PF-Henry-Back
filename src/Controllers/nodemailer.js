const nodemailer = require('nodemailer')

// async function main () {
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
//   const testAccount = await nodemailer.createTestAccount()

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.CORREO_SECRET, // generated ethereal user
    pass: process.env.GOOGLE_SECRET // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false
  }
})

transporter.verify().then(() => {
  console.log('nodemailer conectado')
}).catch((err) => {
  console.log(err)
})

//   // send mail with defined transport object
//   const info = await transporter.sendMail({
//     from: '"AdoptA 🐶🐱" <foo@example.com>', // sender address
//     to: 'bar@example.com, baz@example.com', // list of receivers
//     subject: 'Hello ✔', // Subject line
//     text: 'Hello world?', // plain text body
//     html: '<b>Hello world?</b>' // html body
//   })

//   console.log('Message sent: %s', info.messageId)
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error)

module.exports = {
  transporter
}
