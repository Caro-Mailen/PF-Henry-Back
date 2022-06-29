// aca tenemos que hacer las funciones controladoras de las rutas User
const { Pet, User } = require('../db.js')

const userId = (req, res, next) => {
  const { userId } = req.params
  if (!userId) return next()
  User.findByPk(userId).then((r) => res.send(r))
}

const user = (req, res) => {
  User.findAll().then((r) => res.send(r))
}

const userPost = async (req, res) => {
  const {
    name,
    lastname,
    email,
    image,
    address,
    socialMedia,
    tel,
    age,
    isAdmin
  } = req.body
  if (!name || !lastname || !email || !address || !socialMedia || !tel || !age) { return res.status(400).send('please insert require fields to continue') }
  try {
    const infoUser = { ...req.body }
    const newUser = await User.create(infoUser)
    res.status(200).send(newUser)
  } catch (e) {
    console.log(e)
  }
}
module.exports = {
  user,
  userPost,
  userId
}
