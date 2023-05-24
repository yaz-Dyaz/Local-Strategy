const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../db/models')
const bcrypt = require('bcrypt');

async function authenticate(email, password, done) {
  try {
    const user = await User.findOne({ where: { email } })
    if (!user){
      done(null, false, { message: 'email is not registered!' });
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!passwordCorrect) {
      done(null, false, { message: 'password is not valid!' });
    }
  } catch (error) {
    return done(null, false, { message: error.message })
  }
}

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, authenticate));

// serialize   -> menyimpan sesi
passport.serializeUser((user, done)=> {
  return done(null, user.id);
});

// deserialize -> membaca sesi
passport.deserializeUser(async (id, done) => {
  return done(null, await User.findOne({where:{id}}));
});

module.exports = passport;