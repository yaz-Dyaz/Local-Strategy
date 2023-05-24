const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../db/models')

async function authenticate(email, password, done) {
  try {
    const user = await User.findOne({ where: { email } })
    if (!user){
      done(null, false, { message: 'email is not registered!' });
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!passwordCorrect) {
      error.errors.password = 'password is not valid!'
      done(null, false, { message: 'password is not valid!' });
    }
  } catch (error) {
    return done(null, false, { message: error.message })
  }
}

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, authenticate));