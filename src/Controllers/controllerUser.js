// aca tenemos que hacer las funciones controladoras de las rutas User
const { User } = require('../db.js')
const { transporter } = require('./nodemailer')
const jwtDecode = require('jwt-decode')
const { emailWelcome } = require('../Helper/templateWelcome')
const jwt = require('jsonwebtoken')
const {
  JWT_SECRET
} = process.env

const user = (req, res) => {
  User.findAll().then((r) => res.send(r))
}

const userToken = (req, res) => {
  const { token } = req.params
  let result
  try {
    jwt.verify(token, JWT_SECRET, function (err, decoded) {
      if (err) {
        result = jwtDecode(token)
      } else {
        result = decoded
      }
    })
    delete result.password
    res.send(result)
  } catch (e) {
    res.status(400).send('token invalido')
  }
}

const userRegister = async (req, res) => {
  try {
    const { email, name } = req.body
    const user = await User.findOne({ where: { email } }).catch((error) => {
      console.log(error)
    })
    if (user) {
      return res.json({ error: 'Email existente' })
    }

    // ACA SE HASEA EL PASSWORD.
    const info = { ...req.body }
    await User.create(info).catch((error) => {
      console.log(error)
    })

    const correo = await transporter.sendMail({
      from: '"AdoptA 🐶🐱" <adopta@gmail.com>',
      to: email,
      subject: `¡Bienvenido ${name} !`,
      html: emailWelcome
    })

    console.log('Message sent: %s', correo.messageId)

    // const userSave = await newUser.save().catch ((error)=>{
    //     console.log(error)
    //     res.json({error:'no registrado '})

    return res.json({ message: 'Usuario Registrado!' })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

const userLogin = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ where: { email } }).catch((e) => {
      console.log(e)
    })
    if (!user) {
      return res.json({ error: 'Email inexistente' })
    }
    if (user.password !== password) {
      return res.json({ error: 'Contraseña incorrecta' })
    }
    const jwtoken = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET
    )
    jwt.verify(jwtoken, JWT_SECRET, function (err, decoded) {
      console.log('err:', err)
      console.log('decoded:', decoded)
    })
    res.json({ token: jwtoken })
  } catch (e) {
    return res.status(400).json({ error: e.message })
  }
}

const userLoginGoogle = async (req, res) => {
  const { token } = req.body
  try {
    const { email, password } = jwtDecode(token)
    const user = await User.findOne({ where: { email } }).catch((error) => {
      console.log(error)
    })
    if (!user) {
      await User.create(...req.body)
      return res.json({ message: 'Sesion Iniciada y usuario nuevo creado!' })
    }
    if (user.password === password) {
      return res.status(400).json({ error: 'Constraseña incorrecta' })
    }
    console.log(user.id)
    res.json({ message: 'Sesion Iniciada' })
  } catch (e) {
    return res.status(400).json({ error: e.message })
  }
}

// jwt usuario normal
// jwt.verify(jwtoken, JWT_SECRET, function (err, decoded) {
//   console.log('err:', err)
//   console.log('decoded:', decoded)
// })

// jwt usuario google
// jwtDecode(token)

module.exports = {
  userLogin,
  userRegister,
  user,
  userLoginGoogle,
  userToken
}
