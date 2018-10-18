module.exports = {
    local : {
        url: 'mongodb://localhost:27017/basic-rest',
        port : 3000
    },
    heroku : {
        url : process.env.MONGODB_URI,
        port : process.env.PORT
    }
};