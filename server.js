const express = require('express');
const bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.get('/api', (req, res) => {
    res.json({"message": "Basic Api"})
});


require('./app/routes/routes.js')(app);

app.listen(3000, () => {
    console.log("Server started on port 3000")
});

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('Connected to database.');
}).catch(err => {
    console.log('Unable to connect to database.');
});

// server.js

// BASE SETUP
// =============================================================================
//
// // call the packages we need
// var express    = require('express');        // call express
// var app        = express();                 // define our app using express
// var bodyParser = require('body-parser');
//
// // configure app to use bodyParser()
// // this will let us get the data from a POST
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
//
// var port = process.env.PORT || 8080;        // set our port
//
// // ROUTES FOR OUR API
// // =============================================================================
// var router = express.Router();              // get an instance of the express Router
//
// // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
// router.get('/', function(req, res) {
//     res.json({ message: 'hooray! welcome to our api!' });
// });
//
// // more routes for our API will happen here
//
// // REGISTER OUR ROUTES -------------------------------
// // all of our routes will be prefixed with /api
// app.use('/api', router);
//
// // START THE SERVER
// // =============================================================================
// app.listen(port);
// console.log('Magic happens on port ' + port);