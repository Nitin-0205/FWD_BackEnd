const mongoose = require("mongoose");
const express = require("express");
const FoodRequest = mongoose.model("FoodRequest")
const reqRouter = express();

reqRouter.post("/food",(req,res)=>{
    const {Feedcount, Address,City} = req.body;
    if(Feedcount == ""||Address=="" || City == ""){
        return res.status(201).json({error:"Please Fill all The Fields !!!"})
    }
    const fooddetail = new FoodRequest({Feedcount, Address,City});

    try {
        fooddetail.save();
        return res.status(200).json({msg:"Request Raise Sucessfully !!!"});
    }catch(err){
        return res.status(201).json({error:"Failed to save !!!"});
    }
    
});

reqRouter.get("/getfood",(req,res)=>{
    FoodRequest.find()
            .then(async (savedfood) => {
                if (!savedfood) {
                    return res.status(201).send({ error: "No Food Request" })
                }
                console.log(savedfood);
                return res.status(200).send(savedfood)


            })
    
})

module.exports = reqRouter;