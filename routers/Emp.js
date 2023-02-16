const mongoose = require("mongoose");
const express = require("express");
const routerEmp = express();
const Employee = mongoose.model('Employee');
require('dotenv').config();

routerEmp.post("/addEmployee", (req, res) => {
    const { EmpId, Name, Contact ,Address } = req.body;

    if (EmpId == "" || Name == "" || Contact == "" || Address =="") {
        return res.statusCode(401).send({ "error": "Invalid Cridential !!!" })
    } else {

        Employee.findOne({ EmpId: EmpId })
            .then(async (savedEmp) => {
                if (savedEmp) {
                    return res.status(201).send({ error: "User Already Exist !!!" })
                }
                const emp = new Employee({ EmpId, Name, Contact ,Address});

                try {
                    await emp.save()
                    return res.status(200).send({ msg: "Login Sucessful" });
                } catch(err) {
                    console.log("Failed To Save employee detail")

                }


            })
    }

})

routerEmp.get("/Employees",(req,res)=>{
    Employee.find()
            .then(async (savedEmp) => {
                if (!savedEmp) {
                    return res.status(201).send({ error: "No Employee" })
                }
                console.log(savedEmp);
                return res.status(200).send(savedEmp)


            })

})

module.exports = routerEmp;