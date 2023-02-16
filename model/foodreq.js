const mongoose = require("mongoose");

const foodReqSchema = new mongoose.Schema({
    Feedcount :{
        type:Number,
        required:true,
    },
    Address:{
        type:String,
    },
    City:{
        type:String,
        required:true,
    },
})

mongoose.model("FoodRequest",foodReqSchema);