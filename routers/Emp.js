const mongoose = require("mongoose");
const express = require("express");
const routerEmp = express();
const Employee = mongoose.model('Employee');
const FoodRequest = mongoose.model("FoodRequest")

require('dotenv').config();

routerEmp.post("/addEmployee", (req, res) => {
    const { OrgId, EmpId, Name, Contact, Address } = req.body;

    if (OrgId == "" || EmpId == "" || Name == "" || Contact == "" || Address == "") {
        return res.statusCode(401).send({ "error": "Invalid Cridential !!!" })
    } else {

        Employee.findOne({ EmpId: EmpId })
            .then(async (savedEmp) => {
                if (savedEmp) {
                    return res.status(201).send({ error: "User Already Exist !!!" })
                }
                const emp = new Employee({ OrgId, EmpId, Name, Contact, Address });

                try {
                    await emp.save()
                    return res.status(200).send({ msg: "Employee Add Successful" });
                } catch (err) {
                    console.log("Failed To Save employee detail")

                }


            })
    }

})

routerEmp.post("/Employees", (req, res) => {
    const { OrgId } = req.body;
    console.log(req.body)
    if (OrgId) {
        Employee.find({ OrgId: OrgId })
            .then(async (savedEmp) => {
                console.log(savedEmp)
                if (!savedEmp) {
                    return res.status(201).send({ error: "No Employee" })
                }
                return res.status(200).send(savedEmp)
            })
    }

})

routerEmp.post("/UpdEmployee", (req, res) => {
    const { EmpDetail, foodReqId } = req.body;
    console.log(req.body)

    Employee.find({ _id: EmpDetail._id })
        .then(async (savedEmp) => {
            if (!savedEmp) {
                return res.status(201).send({ error: "Not Available" })
            }

            Employee.updateOne({ _id: EmpDetail._id }, { $set: { Status: "NA" } }, (err, data) => {
                if (err) {
                    return res.status(201).send({ error: "Failed to Accept Request" })
                } else {
                    console.log(data);
                    
                    FoodRequest.findById({ _id: foodReqId })
                        .then(async (saveData) => {
                            if (!saveData) {
                                Employee.updateOne({ _id: EmpDetail._id }, { $set: { Status: "A" } });
                                return res.status(201).send({ error: "Not Available" })
                            }
                            console.log(saveData)
                            FoodRequest.updateOne({ _id: foodReqId }, { $set: { Status: "Accept", AssignVolunteer: EmpDetail }},(err,data)=>{
                                if (err) {
                                    return res.status(201).send({ error: "Failed to Accept Request" })
                                } else {
                                    console.log(saveData)
                                }
                            })
                            // if (result) {
                            //     console.log(FoodRequest.findById({ _id: foodReqId }))
                            //     return res.status(200).send(saveData)
                            // } else {
                            //     return res.status(201).send({ error: "Failed to Assign Employee" })
                            // }
                        })
                }

            })
        })

})


routerEmp.post("/cancel", (req, res) => {
    const {foodReqId } = req.body;
    console.log(req.body)

    FoodRequest.findById({ _id: foodReqId })
    .then(async (savedEmp) => {
            if (!savedEmp) {
                return res.status(201).send({ error: "Not Available" })
            }
            console.log(savedEmp.AssignVolunteer._id)
            FoodRequest.updateOne({ _id: foodReqId }, { $set: { Status: "Pending", AssignVolunteer:null}},(err,data)=>{
                if (err) {
                    return res.status(201).send({ error: "Failed to Cancel Request" })
                }else {
                    Employee.updateOne({ EmpId: savedEmp.AssignVolunteer.EmpId }, { $set: { Status: "A" } }, (error, data) => {
                        if (error) {
                            return res.status(201).send({ error: "Failed to Cancel Request" })
                        }else {
                            return res.status(200).send({ msg: "Canceled Request" })
                        }
                    })

                }
            })

            
        })
    })

    routerEmp.post("/deliver", (req, res) => {
        const {foodReqId } = req.body;

        FoodRequest.findById({ _id: foodReqId })
    .then(async (savedEmp) => {
            if (!savedEmp) {
                return res.status(201).send({ error: "Not Available" })
            }
            console.log(savedEmp.AssignVolunteer._id)
            FoodRequest.updateOne({ _id: foodReqId }, { $set: { Status: "Delivered"}},(err,data)=>{
                if (err) {
                    return res.status(201).send({ error: "Failed to Delivered Request Try Again !!" })
                }else {
                    Employee.updateOne({ EmpId: savedEmp.AssignVolunteer.EmpId }, { $set: { Status: "A" } }, (error, data) => {
                        if (error) {
                            return res.status(201).send({ error: "Failed to Delivered Request Try Again !!" })
                        }else {
                            return res.status(200).send({ msg: "Delivery Received !!!" })
                        }
                    })

                }
            })

            
        })


    })
                    // FoodRequest.findById({ _id: foodReqId })
                    //     .then(async (saveData) => {
                    //         if (!saveData) {
                    //             Employee.updateOne({ _id: EmpDetail._id }, { $set: { Status: "NA" } });
                    //             return res.status(201).send({ error: "Not Available" })
                    //         }
                    //         console.log(saveData)
                    //         FoodRequest.updateOne({ _id: foodReqId }, { $set: { Status: "Pending", AssignVolunteer: []}},(err,data)=>{
                    //             if (err) {
                    //                 return res.status(201).send({ error: "Failed to Cancel Request" })
                    //             } else {
                    //                 console.log(saveData)
                    //             }
                    //         })
                    //     })
                
            



module.exports = routerEmp;