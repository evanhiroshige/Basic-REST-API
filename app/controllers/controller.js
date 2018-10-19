const Obj = require('../models/model.js');
exports.create = (req, res) => {
    if (req.body.hasOwnProperty('_id')) {
        return res.status(400).send({
            verb: req.method,
            url: req.protocol + '://' + req.hostname + req.originalUrl,
            message: "Can not include _id with request."
        });
    }
    obj = new Obj(req.body);
    obj.save().then(data => {
        res.status(201).send(data);
    }).catch(err => {
        res.status(500).send({
            verb: req.method,
            url: req.protocol + '://' + req.hostname + req.originalUrl,
            message: err.message
        });
    });
};

exports.findAll = (req, res) => {
    Obj.find()
        .then(objs => {
            urls = [];
            // add url of each obj to urls
            objs.forEach(obj => urls.push({"url": req.protocol + '://' + req.hostname + req.originalUrl + obj._id}));
            res.json(urls);
        }).catch(err => {
        res.status(500).send({
            verb: req.method,
            url: req.protocol + '://' + req.hostname + req.originalUrl,
            message: err.message
        });
    });
};

exports.findObj = (req, res) => {
    Obj.findById(req.params.uid)
        .then(obj => {
            if (!obj) {
                return res.status(404).send({
                    verb: req.method,
                    url: req.protocol + '://' + req.hostname + req.originalUrl,
                    message: "Could not find object with _id: " + req.params.uid
                });
            }

            res.send(obj);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                verb: req.method,
                url: req.protocol + '://' + req.hostname + req.originalUrl,
                message: "Could not find object " + req.params.uid
            });
        }
        return res.status(500).send({
            verb: req.method,
            url: req.protocol + '://' + req.hostname + req.originalUrl,
            message: "Error updating object " + req.params.uid
        });
    });
};

exports.update = (req, res) => {
    Obj.findById(req.params.uid)
        .then(obj => {
            if (!obj) {
                return res.status(404).send({
                    verb: req.method,
                    url: req.protocol + '://' + req.hostname + req.originalUrl,
                    message: "Could not find object with _id: " + req.params.uid
                });
            }
            if (!req.body.hasOwnProperty("_id")) {
                return res.status(400).send({
                    verb: req.method,
                    url: req.protocol + '://' + req.hostname + req.originalUrl,
                    message: "Must include _id: " + req.params.uid
                });
            }
            if (req.body._id !== req.params.uid) {
                return res.status(404).send({
                    verb: req.method,
                    url: req.protocol + '://' + req.hostname + req.originalUrl,
                    message: "given _id must match include _id: " + req.params.uid
                });
            }

            Obj.replaceOne(obj, req.body, {new: true}).then(
                res.send(req.body)
            ).catch(err => {
                return res.status(404).send({
                        verb: req.method,
                        url: req.protocol + '://' + req.hostname + req.originalUrl,
                        message: "Could not find object with _id: " + req.params.uid
                    }
                )
            });
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                verb: req.method,
                url: req.protocol + '://' + req.hostname + req.originalUrl,
                message: "Could not find object with _id: " + req.params.uid
            });
        }
        return res.status(500).send({
            verb: req.method,
            url: req.protocol + '://' + req.hostname + req.originalUrl,
            message: "Error retrieving object: " + req.params.uid
        });
    });
};

exports.delete = (req, res) => {
    Obj.findByIdAndRemove(req.params.uid)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    verb: req.method,
                    url: req.protocol + '://' + req.hostname + req.originalUrl,
                    message: "Could not find user " + req.params.uid
                });
            }
            res.status(200).send();
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                verb: req.method,
                url: req.protocol + '://' + req.hostname + req.originalUrl,
                message: "Could not find user " + req.params.uid
            });
        }
        return res.status(500).send({
            verb: req.method,
            url: req.protocol + '://' + req.hostname + req.originalUrl,
            message: "Error deleting user " + req.params.uid
        });
    });
};
