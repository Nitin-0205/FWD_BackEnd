const mongoose = require("mongoose");

const date = new Date;

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
    UserId:{
        type:String,
        required:true,
    },
    Role:{
        type:String,
        required:true,
        default:"OTH"
    },
    Vehicle:{
        type:String,
        required:true,
    },
    Type:{
        type:String,
        required:true,
    },
    Location:{
        type:Object,
        required:true,
    },
    Status:{
        default:"Pending",
        type:String,
        required:true,
    },
    Date:{
        default:date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear(),
        type:String,
        required:true,
    },
    Time:{
        default:date.getHours()+':'+date.getMinutes(),
        type:String,
        required:true,
    },
})

mongoose.model("FoodRequest",foodReqSchema);