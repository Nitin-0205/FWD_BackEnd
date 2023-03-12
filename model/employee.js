const mongoose = require("mongoose");


const EmpSchema = new mongoose.Schema({
    EmpId:{
        type:String,
        require:true
    },

    Name:{
        type:String,
        require:true
    }, 
    Contact:{
        type:Number,
        require:true
    },
    Address:{
        type:String,
        require:true
    }, 
})

mongoose.model("Employee",EmpSchema);