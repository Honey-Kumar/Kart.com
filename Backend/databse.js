const mongoose = require("mongoose");
const { DBURL } = require("./config");
const connectDB = () => {
    mongoose.connect(DBURL).then((res) => {
        console.log(`Shopy.com is successfully connected with database with ${res.connection.host}`)
    }).catch((err) => {
        console.log(`Shopy.com is facing issue to connect with database : ${err}`)
    })
}

module.exports = connectDB;