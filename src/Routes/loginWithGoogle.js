const express = require('express')
const passport = require('passport')
// const { isUserAuthenticated } = require('../Middlewares/auth.js')
// const session = require('express-session')
const router = express.Router()

const successLoginUrl = 'http://localhost:3000/'
const errorLoginUrl = 'http://localhost:3000/login/error'

router.get(
  '/login/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureMessage: 'Cannot login to Google, please try again later!',
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl
  }),
  function (req, res) {
    console.log('User: ', req.user)
    const redirect = req.session.oauth2return || '/'
    delete req.session.oauth2return
    res.redirect(redirect)
  }
)

// });

module.exports = router
