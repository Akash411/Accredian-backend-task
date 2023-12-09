require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const names = ['akash','rupal','ishu','sunita','brijkishore','omkar']


app.use("/api/users", userRouter);

app.get('/users',(req,res)=>{
    res.json(names);
})

// app.get("/api", (req,res)=>{
//     res.json({
//         success: 1,
//         message: "this is rest api working",
//     });
// });

app.listen(process.env.APP_PORT,()=>{
    console.log("Server up and running on port: ",process.env.APP_PORT);
})