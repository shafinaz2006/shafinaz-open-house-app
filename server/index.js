const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const session = require('express-session');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const cookieParser = require("cookie-parser");

const utils = require('./routes/util-functions');
app.use(express.json());
app.use(
    cors({
      origin: "http://localhost:3000", // <-- location of the react app were connecting to
      credentials: true,
    })
  );

const sessionConfig = {
    secret: 'thisisasecret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}


app.use(cookieParser('thisisasecret'));
app.use(session(sessionConfig))
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    console.log('in serializeuser', user)
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    console.log('in deserialUser', user.userId);
    let allUser= utils.getAllUser();
    let currentUser = allUser.find(el => el.userId=== user.userId);
    done(null, currentUser);
    
});

// Routes:

const authRoutes = require('./routes/authRoutes');
const properties = require('./routes/properties');
const associates = require('./routes/associates');
const profile = require('./routes/profile');

// Static images:

app.use("/bedrooms", express.static("public/bedrooms"));
app.use("/houses", express.static("public/houses"));
app.use("/kitchens", express.static("public/kitchens"));
app.use("/livingRooms", express.static("public/livingRooms"));
app.use("/myImages", express.static("public/myImages"));

// routes:

app.use('/', authRoutes);
app.use('/profile', profile);
app.use('/properties', properties);
app.use('/associates', associates);


// register strategy:

passport.use('register', new LocalStrategy(
    function(username, password, done) {
		let allUser= utils.getAllUser();
        let user = allUser.find(user => user.username.toLowerCase() === username.toLowerCase());
        if (!user) {
            bcrypt
                .hash(password, 12)
                .then(response => {
                    let newUser = {userId: uuidv4(), username: username, password: response }
                    allUser.push(newUser);
                    fs.writeFileSync("./data/users.json", JSON.stringify(allUser));
                    return done(null, newUser, { success: 'Registration complete' });
                })
                .catch(error => {
                    console.log(error);
                    return done(null, false, { failure: 'Registration is not complete' });
                }); 
        } else{
            console.log('the username already exits');
            return done(null, true, {failure: 'the Username already exists. Please choose another one'});
        }
    }
));

// login strategy:

passport.use('login', new LocalStrategy(
    
    function(username, password, done) {
        console.log('req in login strategy')
        console.log('in strategy', username, password);
		let allUser= utils.getAllUser();
        let user = allUser.find(user => user.username === username);
        if (user) {
            bcrypt
                .compare(password, user.password)
                .then(response =>{
                    console.log('bcrypt response received', response);
                    
                    if(response){  
                        return done(null, user, {success: 'user found'});
                    }
                    else return done(null, true, {failure: 'password has not matched.'});
                })
                .catch(error =>{
                    // console.log('bcrypt error', error);
                    return done(null, false, {failure: 'Please login again!'});
                })
         } else {
            // console.log('error');
            return done(null, true, {failure: 'username is invalid'});
        }
    }
));


// Registration Post Request: 

app.post('/register', passport.authenticate('register'), (req, res) =>{
    if (req.authInfo.success) return res.send({message: {success: req.authInfo.success, failure: ''}});
    else return res.send({message: {success: '', failure: req.authInfo.failure}});
});

// Login Post Request:

app.post('/login', passport.authenticate('login'), (req, res) =>{
    // console.log('in login', req.user);
	if (req.authInfo.success){  
        req.session.user = req.user;
        return res.send({user: req.user, message: {success: req.authInfo.success, failure: ''}});}
    else {
        return res.send({message: {success: '', failure: req.authInfo.failure}});}
});


// Logout
app.get('/logout', function(req, res){
    // console.log(req);
    req.logout();
    res.redirect('/');
  });


// Server Listening: 

app.listen(port, () => {
    console.log(`server listening at ${port}`);
})