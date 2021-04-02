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
        if (!user) {
            bcrypt
                .hash(password, 12)
                .then(response => {
                    let newUser = { userId: uuidv4(), username: username, password: response }
                    allUser.push(newUser);
                    console.log('after bcrypt', newUser)
                    fs.writeFileSync("./data/users.json", JSON.stringify(allUser));
                    return done(null, newUser, { success: 'Registration complete' });
                })
                .catch(error => {
                    console.log(error);
                    return done(null, false, { failure: 'Registration is not complete' });
                });
        } else {
            console.log('the username already exits');
            return done(null, true, { failure: 'the Username already exists. Please choose another one' });
        }
    }
));

// login strategy:

passport.use('login', new LocalStrategy(

    function (username, password, done) {
        console.log('req in login strategy')
        console.log('in strategy', username, password);
        let allUser = utils.getAllUser();
        let user = allUser.find(user => user.username === username);
        if (user) {
            bcrypt
                .compare(password, user.password)
                .then(response => {
                    console.log('bcrypt response received', response);

                    if (response) {
                        return done(null, user, { success: 'user found' });
                    }
                    else return done(null, true, { failure: 'password has not matched.' });
                })
                .catch(error => {
                    // console.log('bcrypt error', error);
                    return done(null, false, { failure: 'Please login again!' });
                })
        } else {
            // console.log('error');
            return done(null, true, { failure: 'username is invalid' });
        }
    }
));


// Registration Post Request: 

router.post('/register', passport.authenticate('register'), (req, res) => {
    console.log('in register', req.user);
    if (req.authInfo.success) {
        req.session.user = req.user;
        return res.send({ user: req.user, message: { success: req.authInfo.success, failure: '' } });
    }
    else return res.send({ message: { success: '', failure: req.authInfo.failure } });
});

// Login Post Request:

router.post('/login', passport.authenticate('login'), (req, res) => {
    // console.log('in login', req.user);
    if (req.authInfo.success) {
        req.session.user = req.user;
        return res.send({ user: req.user, message: { success: req.authInfo.success, failure: '' } });
    }
    else {
        return res.send({ message: { success: '', failure: req.authInfo.failure } });
    }
});


// Logout
router.get('/logout', function (req, res) {
    // console.log(req);
    req.logout();
    res.send('Logged out');
});


module.exports = router;