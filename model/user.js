const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    email: {
        type:String,
        require:true,
        unique:true
    },
    password: {
        type:String,
        require:true,
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