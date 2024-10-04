require('dotenv').config();

const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');

const app=express();
app.use(cors);
app.use(express.json());

const Investment =require("./models/InvestmentSchema.js")

const ConnectionName = process.env.CONNECTION_DETAILS;

mongoose.connect(ConnectionName);

app.get("/investments",(req,res)=>{
    Investment.find({}).then(function(investments){
        res.json(investments);
    }).catch(function(err){
        res.json(err);
    })
});

app.listen(8080,()=>{
    console.log("server is running");
});