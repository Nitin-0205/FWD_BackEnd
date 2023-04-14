const mongoose = require("mongoose");
const express = require("express");
const FoodRequest = mongoose.model("FoodRequest")
const reqRouter = express();

reqRouter.post("/food",(req,res)=>{
    console.log(req.body);
    const {Type,Feedcount, Address,City,Contact,UserId,Name,Role,Vehicle,Location} = req.body;
    if(Type == "" ||Feedcount == ""|| Address==[] || City == "" || Contact =="" || UserId == ""||Name =="",Role ==""||Vehicle =="" ||Location == []){
        return res.status(201).json({error:"Please Fill all The Fields !!!"})
    }
    const fooddetail = new FoodRequest({Feedcount,Address,City,Contact,UserId,Name ,Role,Vehicle,Type,Location});
    console.log(fooddetail)
    try {
        let result = fooddetail.save();

        if(result){
            return res.status(200).json({msg:"Request Raise Sucessfully !!!"});
        }else{
            return res.status(201).json({error:"Failed to raise request !!!"})
        }
    }catch(err){
        return res.status(201).json({error:"Failed to save !!!"});
    }
    
});

reqRouter.post("/getfood",(req,res)=>{
    const {userId,showOth,role,status} = req.body;
    console.log(req.body)
    if(role == "NGO"){
        if(showOth){
            FoodRequest.find({UserId :{$ne :userId},Role :{$ne :"OTH"},Status :status})
                .then(async (savedfood) => {
                    if (!savedfood) {
                        // console.log(savedfood.length);
                        return res.status(201).send({ error: "No Food Request" })
                    }
                    // console.log(savedfood.length);
                    return res.status(200).send(savedfood)
                })
        }else{
            FoodRequest.find({UserId :userId,Status :status})
                .then(async (savedfood) => {
                    if (!savedfood) {
    
                        return res.status(201).send({ error: "No Food Request" })
                    }
                    // console.log(savedfood.length);
                    return res.status(200).send(savedfood)
    
    
                })
        }

    }else if(role === "OTH"){
        FoodRequest.find({Role :role,Status :status})
                .then(async (savedfood) => {
                    if (!savedfood) {
    
                        return res.status(201).send({ error: "No Food Request" })
                    }
                    console.log("DATA",savedfood);
                    return res.status(200).send(savedfood)
    
    
                })

    }
    

})

module.exports = reqRouter;