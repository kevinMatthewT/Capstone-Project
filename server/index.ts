import express, {Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
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

app.get("/api/get/investment/:id", async(req:Request, res: Response,next:NextFunction)=>{
    try{
        const uid= req.params.id;
        const allInvestments=await Investment.findOne({_id:uid});
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
        Company_Investor,   
        Domicile,
        Year_Of_Operation,
        Business,
        Percentage_Ownership,
        Revenue,
        Expense,
        Ebida,
        Tax_Investment,
        Price_Asset,
        Price_Liability,
        Equity,
        COGS, //cost of good sales
        Date_Of_Ownership
    } = req.body

    const newInvestment = new Investment({
        Company,
        Company_Investor,   
        Domicile,
        Year_Of_Operation,
        Business,
        Percentage_Ownership,
        Revenue,
        Expense,
        Ebida,
        Tax_Investment,
        Price_Asset,
        Price_Liability,
        Equity,
        COGS,
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

//post
app.put("/api/update/investment/:id", async(req:Request, res: Response,next:NextFunction)=>{
    const{
        Company,
        Company_Investor,   
        Domicile,
        Year_Of_Operation,
        Business,
        Percentage_Ownership,
        Revenue,
        Expense,
        Ebida,
        Tax_Investment,
        Price_Asset,
        Price_Liability,
        Equity,
        COGS,
        Date_Of_Ownership
    } = req.body

    const uid=req.params.id;

    try{

        await Investment.updateOne({_id:uid},{
            $set:{
                Company:Company,
                Company_Investor:Company_Investor,   
                Domicile:Domicile,
                Year_Of_Operation:Year_Of_Operation,
                Business:Business,
                Percentage_Ownership:Percentage_Ownership,
                Revenue:Revenue,
                Expense:Expense,
                Ebida:Ebida,
                Tax_Investment:Tax_Investment,
                Price_Asset:Price_Asset,
                Price_Liability:Price_Liability,
                Equity:Equity,
                COGS:COGS,
                Date_Of_Ownership:Date_Of_Ownership
            }
        })
        res.status(200).json({status: "Investment saved"})
    }
    catch(error){
        console.error(error);
        next(res.status(500).json({error:"Investments not saved"}));
    }
})


app.listen(port,()=>(console.log(`server is running at port ${port}`)))