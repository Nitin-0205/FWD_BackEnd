require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

const bodyParser = require("body-parser");
const mongoose = require('mongoose');

var cors = require('cors');
app.use(cors());

require("./db");
require("./model/user");
require("./model/employee");
require("./model/foodreq");
require("./model/citymodel");



const authrouter = require("./routers/authRoutes");
const routerEmp = require("./routers/Emp");
const reqRouter = require("./routers/reqRouter");
const cityRouter = require("./routers/City");


app.use(bodyParser.json());

app.use(authrouter)
app.use(routerEmp)
app.use(reqRouter)
app.use(cityRouter)


app.get("/" ,(req,res)=>{
  console.log("index Function")
})


app.listen(port,() => {
  console.log(`server Connected Sucessfully  on Port ${port}!!!`)
})



// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://Nitin:1234@cluster0.zefmbj3.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("NGO").collection("Login");
//   console.log("connected to database");

//   client.close();
// });
