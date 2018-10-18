module.exports = {
    url :  process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL || 'mongodb://localhost:27017/basic-rest',
    port : process.env.PORT || 3000
};