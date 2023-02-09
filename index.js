const express = require('express');
const app = express();
const port = 8000;

const bodyParser = require("body-parser");
const mongoose = require('mongoose');

var cors = require('cors');
app.use(cors());

require("./db");
require("./model/user");
const authrouter = require("./routers/authRoutes");
app.use(bodyParser.json());
app.use(authrouter)


app.get("/login" ,(req,res)=>{
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
