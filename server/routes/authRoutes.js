const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const utils = require('./util-functions');

router.use(express.json());

// register strategy:

passport.use('register', new LocalStrategy(
    function (username, password, done) {
        let allUser = utils.getAllUser();
        let user = allUser.find(user => user.username.toLowerCase() === username.toLowerCase());
        // console.log(user);
        if (!user) {
            bcrypt
                .hash(password, 12)
                .then(response => {
                    let newUser = { userId: uuidv4(), username: username, password: response }
                    allUser.push(newUser);
                    fs.writeFileSync("./data/users.json", JSON.stringify(allUser));
                    return done(null, newUser, { success: 'Registration complete' });
                })
                .catch(error => {
                    return done(null, false, { failure: 'Registration is not complete' });
                });
        } else {
            // console.log('the username already exits');
            return done(null, true, { failure: 'The Username already exists.' });
        }
    }
));

// login strategy:

passport.use('login', new LocalStrategy(
    function (username, password, done) {
        let allUser = utils.getAllUser();
        let user = allUser.find(user => user.username.toLowerCase() === username.toLowerCase());
        if (user) {
            bcrypt
                .compare(password, user.password)
                .then(response => {
                    if (!response) return done(null, true, { failure: 'Password has not matched.' });
                    else return done(null, user, { success: 'User found' });
                })
                .catch(error => {
                    // console.log('bcrypt error', error);
                    return done(null, false, { failure: 'Please login again!' });
                })
        } else {
            return done(null, true, { failure: 'Username is invalid' });
        }
    }
));


// Registration Post Request: 

router.post('/register', passport.authenticate('register'), (req, res) => {
    if (req.authInfo.success) {
        req.session.user = req.user;
        return res.send({ user: req.user, message: { success: req.authInfo.success, failure: req.authInfo.failure } });
    }
    else return res.send({ message: { success: '', failure: req.authInfo.failure } });
});

// Login Post Request:

router.post('/login', passport.authenticate('login'), (req, res) => {
    if (req.authInfo.success) {
        req.session.user = req.user;
        return res.send({ user: req.user, message: { failure: req.authInfo.failure, success: req.authInfo.success } });
    }
    else return res.send({ message: { failure: req.authInfo.failure, success: req.authInfo.success  } });
});


// Logout

router.get('/logout', function (req, res) {
    req.logout();
    res.send('Logged out');
});

module.exports = router;