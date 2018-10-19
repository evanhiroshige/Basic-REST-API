const express = require('express');
const bodyparser = require('body-parser');
const app = express();

var dbURI = 'mongodb://localhost:27017/test';
// if in production env, use mongodb_uri
if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGODB_URI;
}
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

app.get('/api', (req, res) => {
    res.json({"message": "Basic API"})
});

app.use((err, req, res, then) => {
    if (err instanceof SyntaxError) {
        return res.status(404).send({
            verb: req.method,
            url: req.protocol + "://" + req.hostname + req.originalUrl,
            message: "Not a JSON object"
        });
    }
    else {
        then();
    }
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