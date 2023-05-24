const { User } = require('../db/models');
const bcryp = require('bcrypt');
const passport = require('../utils/passport')
// const jwt = require('jsonwebtoken');
// const { JWT_SECRET_KEY } = process.env;

module.exports = {
    homePage: async (req, res) => {
        return res.render('home');
    },
    registerPage: async (req, res) => {
        return res.render('auth/register', { errors: { name: '', email: '', password: '' } });
    },
    loginPage: async (req, res) => {
        return res.render('auth/login', { errors: { email: '', password: '' } });
    },
    login: passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }),
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const error = { errors: {} }

            if (!email) {
                error.errors.email = 'email is required!';
            }
            if (!name) {
                error.errors.name = 'name is required!';
            }
            if (!password) {
                error.errors.password = 'password is required!';
            }
            if (!email || !name || !password) {
                return res.render('auth/register', error);
            }

            const exist = await User.findOne({ where: { email } });
            if (exist) {
                return res.render('error', { error: 'email already used!' })
            }

            const hashPassword = await bcryp.hash(password, 10);

            await User.create({
                name, email, password: hashPassword
            });

            return res.redirect('/home');
        } catch (error) {
            throw error;
        }
    },

    // login: async (req, res) => {
    //     try {
    //         const { email, password } = req.body;

    //         const error = { errors: {} }

    //         if (!email) {
    //             error.errors.email = 'email is required!';
    //         }
    //         if (!password) {
    //             error.errors.password = 'password is required!';
    //         }
    //         if (!email || !password) {
    //             return res.render('auth/login', error);
    //         }

    //         const user = await User.findOne({ where: { email } });
    //         if (!user) {
    //             return res.status(400).json({
    //                 status: false,
    //                 message: 'credential is not valid!',
    //                 data: null
    //             });
    //         }

    //         const passwordCorrect = await bcryp.compare(password, user.password);
    //         if (!passwordCorrect) {
    //             return res.status(400).json({
    //                 status: false,
    //                 message: 'credential is not valid!',
    //                 data: null
    //             });
    //         }

    //         const payload = {
    //             id: user.id,
    //             name: user.name,
    //             email: user.email,
    //             role_id: user.role_id
    //         };

    //         const token = await jwt.sign(payload, JWT_SECRET_KEY);
    //         return res.status(200).json({
    //             status: true,
    //             message: 'login success!',
    //             data: {
    //                 token: token
    //             }
    //         });

    //         return res.redirect('home');

    //     } catch (error) {
    //         throw error;
    //     }
    // },

    whoami: async (req, res) => {
        try {
            return res.render('auth/whoami', { user: req.user });
        } catch (error) {
            throw error;
        }
    }
};