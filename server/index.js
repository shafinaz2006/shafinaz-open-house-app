const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const fs = require('fs');
const session = require('express-session');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
const getAllUser = () => {
    const allUser = fs.readFileSync('./data/users.json');
    // console.log('inside all user method', allUser);
    const parsedData = JSON.parse(allUser);
    // console.log('inside all user method, parsedData', parsedData);
    return parsedData;
};
passport.use('register', new LocalStrategy(
    function(username, password, done) {
		let allUser= getAllUser();
        let user = allUser.find(user => user.username.toLowerCase() === username.toLowerCase());
        if (!user) {
            bcrypt
                .hash(password, 12)
                .then(response => {
                    let newUser = {username: username, password: response }
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
// login middleware:
passport.use('login', new LocalStrategy(
    function(username, password, done) {
		let allUser= getAllUser();
        let user = allUser.find(user => user.username === username);
        if (user) {
            bcrypt
                .compare(password, user.password)
                .then(response =>{
                    // console.log('bcrypt response received', response);
                    if(response) return done(null, {success: 'user found'});
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


const authRoutes = require('./routes/authRoutes');
const properties = require('./routes/properties');
const associates = require('./routes/associates');

app.use(cors());

app.use("/bedrooms", express.static("public/bedrooms"));
app.use("/houses", express.static("public/houses"));
app.use("/kitchens", express.static("public/kitchens"));
app.use("/livingRooms", express.static("public/livingRooms"));

// routes:

app.use('/', authRoutes);
app.use('/properties', properties);
app.use('/associates', associates);

// Registration Post Request: 

app.post('/register', passport.authenticate('register'), (req, res) =>{
    if (req.authInfo.success) return res.send({message: {success: req.authInfo.success, failure: ''}});
    else return res.send({message: {success: '', failure: req.authInfo.failure}});
});

// Login Post Request:

app.post('/login', passport.authenticate('login'), (req, res) =>{
	if (req.authInfo.success)  return res.send({message: {success: req.authInfo.success, failure: ''}});
    else return res.send({message: {success: '', failure: req.authInfo.failure}});
});

// Server Listening: 

app.listen(port, () => {
    console.log(`server listening at ${port}`);
})