// Imports
const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');


// Setting up express app
const app = express();
const port = 8080;

// import routers
const indexRouters = require('./routes/index')

// setting ejs view engine
app.set("view engine", "ejs");
// setting up ejs mate
app.engine("ejs", ejsMate);
// setting views and public paths
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouters);

// setting views and public paths
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// reading post requests data using urlencoding
app.use(express.urlencoded({ extended: true }));
// setting method override variable to be able to override post request to put, patch, delete and others
// app.use(methodOverride("_method"));

app.listen(port, () => {
    console.log(`App is listening on port: ${port}`);
})