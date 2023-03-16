const mongoose = require("mongoose");


const EmpSchema = new mongoose.Schema({
    OrgId:{
        type:String,
        require:true
    },
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
    Status:{
        type:String,
        required:true,
        default:"A"
    },
})

mongoose.model("Employee",EmpSchema);