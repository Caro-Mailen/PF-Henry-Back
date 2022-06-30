const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')

const GOOGLE_CLIENT_ID = "587687410177-46em905vl6hc9b7huodb6g21mq2ushpe.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb, done) {
    done(null, profile)
    //const userProfile ={name:profile.displayName, }
    User.findOrCreate({ googleId: profile.id })
   
  }
));

passport.serializeUser((user, done,)=>{
    done(null, user)

})
passport.deserializeUser((user, done,)=>{
    done(null, user)
    
})