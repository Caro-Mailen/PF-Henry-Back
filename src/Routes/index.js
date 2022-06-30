const { Router } = require('express')

const pet = require('./routePets')
const user = require('./routeUser')
const userPet = require('./ruteUserPet')
const donation = require('./ruteDonation')
const breed = require('./routeBreed.js')
const passport = require('passport')

// const user = require('./routeUser')

const router = Router()

router.get('/login/succes',(req,res)=>{
   if(req.user){
    res.status(200).json({succes:true, message:'succesfull', user:req.user})
}
})
router.get('/login/failed',(req,res)=>{
    res.status(401).json({succes:false, message:'failure'})
})

router.get('/logout', (req,res)=>{
    req.logout()
    res.redirect('http://localhost:3001')
})



router.get('/userGoogle', passport.authenticate('google',{scope:['profile']}))
router.get('/userGoogle/callback', passport.authenticate('google',{successRedirect:'http://localhost:3001', failureRedirect:'login/failed'}))


router.use('/pet', pet)
router.use('/donation', donation)
router.use('/user', user)
router.use('/userRegister', user)
router.use('/userLogin', user)
router.use('/userPet', userPet)
router.use('/breed', breed)
//router.use('/', (req, res, next) => res.send('welcome to pfmascotas-api'))


module.exports = router
