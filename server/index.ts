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

app.get("/api/get/investment/Company/filter:filtername", async(req:Request, res: Response,next:NextFunction)=>{
    try{
        const filtername= req.params.filtername;
        const allInvestments=await Investment.find({Company:{$regex: filtername}});
        res.status(200).json(allInvestments);
    }
    catch(error){
        console.error(error);
        next(res.status(500).json({error:"Investments not found"}));
    }
})

app.get("/api/get/investment/Domicile/filter:filtername", async(req:Request, res: Response,next:NextFunction)=>{
    try{
        const filtername= req.params.filtername;
        const allInvestments=await Investment.find({Domicile:{$regex: filtername}});
        res.status(200).json(allInvestments);
    }
    catch(error){
        console.error(error);
        next(res.status(500).json({error:"Investments not found"}));
    }
})

app.get("/api/get/investment/Year_Of_Operation/filter:filtername", async(req:Request, res: Response,next:NextFunction)=>{
    try{
        const filtername= req.params.filtername;
        const numFilter=Number(filtername)
        const allInvestments=await Investment.find({Year_Of_Operation:{$gte:numFilter}});
        res.status(200).json(allInvestments);
    }
    catch(error){
        console.error(error);
        next(res.status(500).json({error:"Investments not found"}));
    }
})

app.get("/api/get/investment/Business/filter:filtername", async(req:Request, res: Response,next:NextFunction)=>{
    try{
        const filtername= req.params.filtername;
        const allInvestments=await Investment.find({Business:{$regex: filtername}});
        res.status(200).json(allInvestments);
    }
    catch(error){
        console.error(error);
        next(res.status(500).json({error:"Investments not found"}));
    }
})

app.get("/api/get/investment/Percentage_Ownership/filter:filtername", async(req:Request, res: Response,next:NextFunction)=>{
    try{
        const filtername= req.params.filtername;
        const numFilter=Number(filtername)
        const allInvestments=await Investment.find({Percentage_Ownership:{$gte:numFilter}});
        res.status(200).json(allInvestments);
    }
    catch(error){
        console.error(error);
        next(res.status(500).json({error:"Investments not found"}));
    }
})

app.get("/api/get/investment/Price_Asset/filter:filtername", async(req:Request, res: Response,next:NextFunction)=>{
    try{
        const filtername= req.params.filtername;
        const numFilter=Number(filtername)
        const allInvestments=await Investment.find({Price_Asset:{$gte:numFilter}});
        res.status(200).json(allInvestments);
    }
    catch(error){
        console.error(error);
        next(res.status(500).json({error:"Investments not found"}));
    }
})

app.get("/api/get/investment/Date_Of_Ownership/filter:filtername", async(req:Request, res: Response,next:NextFunction)=>{
    try{
        const filtername= req.params.filtername;
        const allInvestments=await Investment.find({Date_Of_Ownership:{$gte:filtername}});
        res.status(200).json(allInvestments);
    }
    catch(error){
        console.error(error);
        next(res.status(500).json({error:"Investments not found"}));
    }
})

// app.get("/api/get/investment/All/:fn1/:fn2/:fn3/:fn4/:fn5/:fn6", async(req:Request, res: Response,next:NextFunction)=>{
//     try{
//         const filtername1= req.params.fn1;
//         const filtername2= req.params.fn2;
//         const filtername3= req.params.fn3;
//         const filtername4= req.params.fn4;
//         const filtername5= req.params.fn5;
//         const filtername6= req.params.fn6;
//         const allInvestments=await Investment.find({Business:{$regex: filtername2}});
//         res.status(200).json(allInvestments);
//     }
//     catch(error){
//         console.error(error);
//         next(res.status(500).json({error:"Investments not found"}));
//     }
// })




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