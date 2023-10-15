const mongoose = require('mongoose');

const connectToMongo = () => {
    // the iNotebook is going to be the database name
mongoose.connect('mongodb://127.0.0.1/iNotebook');
    console.log("Connected to MongoDB");
}

module.exports = connectToMongo;

