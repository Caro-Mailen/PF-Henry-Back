// aca tenemos que hacer las funciones controladoras de las rutas User
const { User } = require('../db.js')
const jwt = require('jsonwebtoken')
const {
    JWT_SECRET
  } = process.env;
  const passport = require('passport')
  const passportJwt = require ('passport-jwt');

  const ExtractJwt = passport.ExtractJt
  const EstrategyJwt = passport.EstrategyJwt
// const userId = (req, res, next) => {
//   const { userId } = req.params
//   if (!userId) return next()
//   User.findByPk(userId).then((r) => res.send(r))
// }

// const user = (req, res) => {
//   User.findAll().then((r) => res.send(r))
// }

// const userPost = async (req, res) => {
//   const {
//     name,
//     lastname,
//     email,
//     image,
//     address,
//     socialMedia,
//     tel,
//     age,
//     isAdmin
//   } = req.body
//   if (!name || !lastname || !email || !address || !socialMedia || !tel || !age) { return res.status(400).send('please insert require fields to continue') }
//   try {
//     const infoUser = { ...req.body }
//     const newUser = await User.create(infoUser)
//     res.status(200).send(newUser)
//   } catch (e) {
//     console.log(e)
//   }
// }

const userRegister = async(req, res)=>{
  console.log(req.body)
  const {name, email, password} = req.body
  const x = await User.findOne({where:{email}}).catch((error)=>{
      console.log(error)
  })
  if(x){return res.json({message: 'email existente'})}
  const newUser = new User({name, email, password})
  const userSave = await newUser.save().catch ((error)=>{
      console.log(error)
      res.json({error:'no registrado '})
  })

  if(userSave){
      return res.json(newUser)
  }

  res.json({message: "holi"})
}



const userLogin = async(req, res)=>{
  const {email, password} = req.body

  const userEmail = await User.findOne({where: {email}}).catch((error)=>{
      console.log(error)
  })
  if(!userEmail){
      return res.json({message: 'password or mail incorrect'})
  }
  if(userEmail.password !== password){
      return res.json({message: 'password or mail incorrect'})
  }

  const jwtoken = jwt.sign({id:userEmail.id, email:userEmail.email}, JWT_SECRET)
  res.json({message: 'holi', token:jwtoken})

}

module.exports = {
  userLogin,
  userRegister
}
