const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const date = new Date;

const userSchema = new mongoose.Schema({
    email: {
        type:String,
        require:true,
        unique:true
    },
    name: {
        type:String,
        require:true,
    },
    contact: {
        type:String,
        require:true,
        unique:true
    },
    role: {
        type:String,
        require:true,
    },
    city: {
        type:String,
        require:true,
    },
    address: {
        type:Object,
        require:true,
    },
    password: {
        type:String,
        require:true,
    },
    Date:{
        default:date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear(),
        type:String,
        required:true,
    },

})

// userSchema.pre('save',async (next)=>{
//     user = this;
//     console.log("just Before Sign Up password : ",user.password);
//     console.log("after save",user)

//     if(!user.isModified('password')){
//         return next();
//     }
//     user.password = await bcrypt.hash(user.password,8)
//     console.log(user.password);


// })

mongoose.model("User",userSchema);