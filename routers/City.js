
const mongoose = require("mongoose");
const express = require("express");
const cityRequest = mongoose.model("City")
const routerCity = express();

routerCity.post("/AddCity",(req,res)=>{
    const {key,value} = req.body;
    if(key == null ||value == ""){
        return res.status(201).json({error:"Please Fill all The Fields !!!"})
    }
    const citydetail = new cityRequest({key,value});
    
    cityRequest.findOne({ value: value })
            .then(async (savedCity) => {
                if (savedCity) {
                    return res.status(201).send({ error: "City Already Exist !!!" })
                }

                try {
                    citydetail.save();
                    return res.status(200).json({msg:"New City Add Sucessfully !!!"});
                }catch(err){
                    return res.status(201).json({error:"Failed to save !!!"});
                }

            })

    
    
});

routerCity.get("/City",(req,res)=>{
    cityRequest.find()
            .then(async (savedcity) => {
                if (!savedcity) {
                    return res.status(201).send({ error: "No City" })
                }
                // console.log(savedcity);
                return res.status(200).send(savedcity)
            })

})

module.exports = routerCity;