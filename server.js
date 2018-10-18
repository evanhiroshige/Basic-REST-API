const express = require('express');
const bodyparser = require('body-parser');
const app = express();
var dbURI = 'mongodb://localhost/Loc8r';
if (process.env.NODE_ENV === 'production') {
    console.log("HERE");
    dbURI = process.env.MONGOLAB_URI;
}
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());


const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


app.get('/api', (req, res) => {
    res.json({"message": "Basic Api"})
});

console.log(dbURI);

mongoose.connect(dbURI, {
    useNewUrlParser: true
}).then(() => {
    console.log('Connected to database.');
}).catch(err => {
    console.log('Unable to connect to database.');
});
require('./app/routes/routes.js')(app);
console.log(process.env.PORT);
app.listen(process.env.PORT || 3000, () => {
    console.log("Server started.")
});