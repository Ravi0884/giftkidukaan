const mongoose = require('mongoose')
require('dotenv').config();

const url = process.env.DB_PASSWORD;

module.exports.connect = () =>{
    mongoose.connect(url).then((res) =>
     console.log("Db connection successfully")).catch((err)=> console.log('Error:-',err))
}