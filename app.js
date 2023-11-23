// Imports
const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');
const session = require('express-session')
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo');
const passport = require('passport')
const methodOverride = require("method-override");

require('dotenv').config();

// Setting up express app
const app = express();
const port = 3000;

// creating a express session
app.use(session({
    secret: 'tejfwemoiwefodxixdiuqwjwioxjnwqcklmwqewioxqwnoexiqwmxenok',  // a secret string used to sign the session ID cookie
    resave: false,  // don't save session if unmodified
    saveUninitialized: false,  // don't create session until something stored
    // cookie: { httpOnly: true, maxAge: Date.now() + 7 * 24 * 60 * 60 * 1000, expires: 7 * 24 * 60 * 60 * 1000 },
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(async (req, res, next) => {
    res.locals.currUser = req.user;
    next();
})

// import routers
const indexRouters = require('./routes/index')
const noteRouters = require('./routes/notes')
const authRouters = require('./routes/auth')

// setting ejs view engine
app.set("view engine", "ejs");
// setting up ejs mate
app.engine("ejs", ejsMate);
// setting views and public paths
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// setting views and public paths
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// reading post requests data using urlencoding
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setting method override variable to be able to override post request to put, patch, delete and others
app.use(methodOverride("_method"));

app.use("/", indexRouters);
app.use("/", noteRouters);
app.use("/", authRouters);

// Connecting MongoDB
main()
    .then((res) => {
        console.log("Connection established (Mongoose connection)");
    })
    .catch((err) => console.log(err));
async function main() {
    await mongoose.connect(process.env.MONGO_URI);
}

app.listen(port, () => {
    console.log(`App is listening on port: ${port}`);
})