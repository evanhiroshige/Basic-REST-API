module.exports = (app) => {
    const users = require('../controllers/controller.js');

    app.post('/api/objects', users.create);

    app.get('/api/objects', users.findAll);

    app.get('/api/objects/:uid', users.findObj);

    app.put('/api/objects/:uid', users.update);

    app.delete('/api/objects/:uid', users.delete);
}