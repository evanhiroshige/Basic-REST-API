import * as dbConfig from "./config/database.config";

const express = require('express');
const bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());


app.get('/api', (req, res) => {
    res.json({"message": "Basic Api"})
});

require('./app/routes/routes.js')(app);

const db = dbConfig.heroku;
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(db.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('Connected to database.');
}).catch(err => {
    console.log('Unable to connect to database.');
});

app.listen(db.port, () => {
    console.log("Server started.")
});
