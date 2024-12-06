// loads env file contents into process.env by default
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const router = require("./Router/router");
require('./DB/connection')
// create server
const pfServer = express();
// use cors after server creation for data sharing
pfServer.use(cors());
pfServer.use(express.json())
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))
const PORT=3000||process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`pfServer Started Running at PORT ${PORT}`);
    
})


pfServer.get('/',(req,res)=>{
    res.send("<h1>Project Fair application started running & waiting for client request....</h1>");
})