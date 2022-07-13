const { PetitionGet, User, Pet, PetitionGetLost, PetitionLoad } = require('../db.js')
const { transporter } = require('./nodemailer')
const jwtDecode = require('jwt-decode')
const { emailWelcome } = require('../Helper/templateWelcome')
const jwt = require('jsonwebtoken')
const {
  JWT_SECRET
} = process.env
const { decode } = require('../Helper/decode.js')

const user = (req, res) => {
  User.findAndCountAll().then((r) => res.send(r))
}

// const countUsers = (req, res) => {
//   User.count().then((r) => res.send(r))
// }

const userAll = (req, res) => {
  User.findAll({ include: [PetitionGet, Pet, PetitionGetLost, PetitionLoad] }).then((r) => {
    r.sort(function (a, b) { return a.id - b.id })
    res.send(r)
  })
}

const userToken = (req, res) => {
  const { token } = req.params
  try {
    User.findOne({ where: { email: decode(token).email } }).then(user => {
      res.send(user)
    })
  } catch (e) {
    res.status(400).send({ error: 'token invalido' })
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

    // const correo
    await transporter.sendMail({
      from: '"Patitas 🐾" <adopta@gmail.com>',
      to: email,
      subject: `¡Bienvenido ${name} !`,
      html: emailWelcome
    })

    // console.log('Message sent: %s', correo.messageId)

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
      { id: user.id, email: user.email, rol: user.rol },
      JWT_SECRET
    )
    res.json({ token: jwtoken })
  } catch (e) {
    return res.status(400).json({ error: e.message })
  }
}

const userLoginGoogle = async (req, res) => {
  const { token } = req.body

  try {
    const decoded = jwtDecode(token)

    const user = await User.findOne({ where: { email: decoded.email } }).catch((error) => {
      console.log(error)
    })

    if (user === null) {
      const data = {
        email: decoded.email,
        name: decoded.given_name,
        lastname: decoded.family_name,
        picture: decoded.picture
      }
      await User.create(data)
      return res.json({ message: 'Sesion Iniciada y usuario nuevo creado!' })
    }
    res.json({ message: 'Sesion Iniciada' })
  } catch (e) {
    return res.status(400).json({ error: e.message })
  }
}

const updatePassword = async (req, res, next) => {
  try {
    const { password } = req.body
    const { id } = req.params
    await User.update({ password }, {
      where: {
        id
      }
    })
    res.send('se cambio la contraseña con exito')
  } catch (error) {
    next(error)
  }
}

module.exports = {
  userLogin,
  userRegister,
  user,
  // countUsers,
  updatePassword,
  userLoginGoogle,
  userToken,
  userAll
}
