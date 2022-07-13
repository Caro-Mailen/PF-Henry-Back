const nodemailer = require('nodemailer')

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

const mail = async (email, subject, html) => {
  await transporter.sendMail({
    from: '"Patitas 🐾" <patitas.adopt@gmail.com>', // sender address
    to: email, // list of receivers
    subject, // Subject line
    html // html body
  })
}
// console.log('Message sent: %s', mail.messageId)

module.exports = {
  transporter,
  mail
}
