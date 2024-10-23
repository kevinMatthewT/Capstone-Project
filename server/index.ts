import express, {Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import Investment from './models/InvestorSchema';
import cors from 'cors';

dotenv.config();

const app: Express=express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
const ConnectionString = process.env.CONNECTION_DETAILS;

mongoose.connect("mongodb://localhost:27017/techasia",{})
.then(()=>(console.log("connected")))
.catch((err)=>(console.log(err)))


//get operations
app.get('/', (req : Request, res: Response)=>{
    res.send("hello from the backend")
})

app.get("/api/get/investment", async(req:Request, res: Response,next:NextFunction)=>{
    try{
        const allInvestments=await Investment.find({});
        res.status(200).json(allInvestments);
    }
    catch(error){
        console.error(error);
        next(res.status(500).json({error:"Investments not found"}));
    }
})

//post operations
app.post("/api/post/investment", async(req:Request, res: Response, next:NextFunction)=>{
    const{
        Company,
        Domicile,
        Year_Of_Operation,
        Business,
        Percentage_Ownership,
        Price_Asset,
        Date_Of_Ownership
    } = req.body

    const newInvestment = new Investment({
        Company,
        Domicile,
        Year_Of_Operation,
        Business,
        Percentage_Ownership,
        Price_Asset,
        Date_Of_Ownership
    })

    try{

        // res.send(newInvestment);

        await newInvestment.save()
        res.status(200).json({status: "Investment saved"})
    }
    catch(error){
        console.error(error);
        next(res.status(500).json({error:"Investments not saved"}));
    }
})

//delete 
app.delete("/api/delete/investment/:id", async(req:Request, res: Response,next:NextFunction)=>{
    try {
        const id= req.params.id;
        await Investment.deleteOne({_id:id})
        res.status(200).json({status: "Investment deleted"})
    } catch (error) {
        console.error(error);
    }
})

app.listen(port,()=>(console.log(`server is running at port ${port}`)))