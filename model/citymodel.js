const mongoose = require("mongoose");


const CitySchema = new mongoose.Schema({
    key :{
        type:Number,
        required:true,
    },
    value:{
        type:String,
        required:true,
    },
})

mongoose.model("City",CitySchema);