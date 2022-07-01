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

const userLogin = async(req, res)=>{
  const {email, password} = req.body
  console.log(req.body)
  try{  const userEmail = await User.findOne({where: {email}}).catch((error)=>{
      console.log(error)
  })
  if(!userEmail){
    return res.json({message: 'password or mail incorrect'})
  }
  if(userEmail.password !== password){
      return res.json({message: 'password or mail incorrect'})
    }
    
    const jwtoken = jwt.sign({id:userEmail.id, email:userEmail.email}, JWT_SECRET)
    res.json({message: 'holi', token:jwtoken})}catch(err){
    console.log(err)
  }

    
  }
  const userRegister = async(req, res)=>{
  const {name, email, password} = req.body
      // console.log(req.body)
      try{   const x = await User.findOne({where:{email}}).catch((error)=>{
        console.log(error)
    })
    if(x){return res.json([x])}
    const newUser = new User({name, email, password})
    const userSave = await newUser.save().catch ((error)=>{
        console.log(error)
        res.json(['no registrado '])
    })
  
    if(userSave){
        return res.json(newUser)
    }
  
    res.send({message: "holi"})
  }catch(err){
        console.log(err)
      }}
 
  // const loginSucces=(req,res)=>{
    //   if(req.user){
      //    res.status(200).json({succes:true, message:'succesfull', user:req.user})
      // }
// }


// const loginFailed =(req,res)=>{
//   res.status(401).json({succes:false, message:'failure'})
// }

// const logout=(req,res)=>{
//   req.logout()
//   res.redirect('http://localhost:3001')
// }


module.exports = {
  userLogin,
  userRegister,
  user,
//   loginSucces,
//   logout,
//   loginFailed,
//   loginSucces
 }
