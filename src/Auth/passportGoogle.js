const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const {User} = require("../db.js");

const GOOGLE_CALLBACK_URL = "http://localhost:3001/auth/google/callback";

passport.use(
  new GoogleStrategy(
    {
      clientID: '967345775881-3m03jq9205ppg4cjvcaghp993i40jsk8.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
      scope: ["profile", "email"],
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      const defaultUser = {
    
        name: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0].value,
        googleId: profile.id,
      };
console.log(defaultUser)
      const user = await User.findOrCreate({
        where: { googleId: profile.id},
        defaults: defaultUser,
      })
      .catch((err) => {
        console.log("Error signing up", err);
        cb(err, null);
      });

      if (user && user[0]) return cb(null, user[0]);
    }
  )
);




passport.serializeUser((user, cb) => {
  console.log("Serializing user:", user);
  cb(null, user.id);
});

// passport.deserializeUser = (async (id, cb) => {
//   const user = await User.findOne({ where: { id } }).catch((err) => {
//     console.log("Error deserializing", err);
//     cb(err, null);
//   });

//   console.log("DeSerialized user", user);

//   if (user) cb(null, user);
// });

passport.deserializeUser((user, done) => {
  done(null, user);
});