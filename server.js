const express = require('express');
const bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());


const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('./app/routes/routes.js')(app);

app.get('/api', (req, res) => {
    res.json({"message": "Basic Api"})
});

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
}).then(() => {
    console.log('Connected to database.');
}).catch(err => {
    console.log('Unable to connect to database.');
});


app.listen(process.env.PORT || 3000, () => {
    console.log("Server started.")
});