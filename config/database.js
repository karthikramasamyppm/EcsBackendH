//Set up mongoose connection
console.log('in db config');
const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/casify';
//const mongoDB = 'mongodb://admin1:admin123@ds157276.mlab.com:57276/ecs';
mongoose.connect(mongoDB);
console.log('in db config1');
mongoose.Promise = global.Promise;

module.exports = mongoose;
/*const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:')*/