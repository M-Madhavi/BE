const mongoose = require('mongoose')
const {MONGO_URL} = process.env

exports.connect = () =>{
    mongoose.connect(MONGO_URL,{
        useNewUrlparser:true,
        useUnifiedTopology:true
    })
    .then(() =>{
        console.log("DB Connected");
    })
    .catch((err) =>{
        console.log("DB connection FAILED",err);
        process.exit(1)
    })
}