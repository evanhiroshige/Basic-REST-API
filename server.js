const express = require('express');
const bodyparser = require('body-parser');
const app = express();

var dbURI = 'mongodb://localhost:27017/test';
if (process.env.NODE_ENV === 'production') {
    console.log("HERE");
    dbURI = process.env.MONGODB_URI;
}
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

app.get('/api', (req, res) => {
    res.json({"message": "Basic API"})
});

mongoose.connect(dbURI, {
    useNewUrlParser: true
}).then(() => {
    console.log('Connected to database.');
}).catch(err => {
    console.log('Unable to connect to database.');
});
require('./app/routes/routes.js')(app);
app.listen(process.env.PORT || 3000, () => {
    console.log("Server started.")
});