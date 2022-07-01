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
    const {name, email, password} = req.body
    console.log(req.body)
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

  res.send({message: "holi"})
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
      res.json({message:req.body , token:jwtoken})
  } catch (error) {
    console.log(error)
  }
  
}


// const logout=(req,res)=>{
//   req.logout()
//   res.redirect('http://localhost:3001')
// }


module.exports = {
  userLogin,
  userRegister,
  user,
  // logout,

 }
