const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27018/inotebook"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI)
}

module.exports = connectToMongo;