const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', false);
mongoose.connect(process.env.mongo_URL)

.then(()=>{
    console.log("connected To DataBase");
})
.catch((err)=>{
    console.log("Coudn't Connect to database",err);
}
)