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


const user = (req, res) => {
  User.findAll().then((r) => res.send(r))
}
const userRegister = async(req, res)=>{

  try {
    const {email} = req.body
    console.log(req.body)
  const x = await User.findOne({where:{email}}).catch((error)=>{
      console.log(error)
  })
  if(x){return res.json({message: 'email existente'})}
  const info ={...req.body}
  console.log(info)
  const newUser = await User.create(info)
  // const userSave = await newUser.save().catch ((error)=>{
  //     console.log(error)
  //     res.json({error:'no registrado '})

  

  
      return res.json(newUser)
  

  
  } catch (error) {
    console.log(error)
  }
}

const userLogin = async(req, res)=>{

  try {
    const {email, password} = req.body
    console.log(req.body)
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
      res.json({message: userEmail, token:jwtoken})
  } catch (error) {
    console.log(error)
  }
  
}




module.exports = {
  userLogin,
  userRegister,
  user
 }
