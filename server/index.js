const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const fs = require('fs');
// const { v4: uuidv4 } = require('uuid');
const session = require('express-session');
const passport = require('passport');
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
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    let allUser= utils.getAllUser();
    let currentUser = allUser.find(el => el.userId=== user.userId);
    if(!currentUser) return done(null, false);
    else return done(null, currentUser);
    
});

// Routes:

const authRoutes = require('./routes/authRoutes');
const properties = require('./routes/properties');
const associates = require('./routes/associates');
const profile = require('./routes/profile');
const users = require('./routes/UserRoutes');

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
app.use('/users', users);


// Server Listening: 

app.listen(port, () => {
    console.log(`server listening at ${port}`);
})