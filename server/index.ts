import express, {Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Investment from './models/InvestorSchema';
import cors from 'cors';
import path from 'path'
import { exec } from 'child_process';

dotenv.config();
exec(`pip install -r ../../pip_requirement.txt`)

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

app.get("/api/get/investment/Company/filter/:filtername", async(req:Request, res: Response,next:NextFunction)=>{
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

app.post("/api/post/investment/many", async(req:Request, res: Response, next:NextFunction)=>{
    const multipleInvestments=req.body

    if (!Array.isArray(multipleInvestments)) {
        res.status(400).json({
          error: "Request body must be an array of investments.",
        });
        return;
      }

    const Investments = multipleInvestments.map((item) => ({
        Company: item.Company,
        Company_Investor: item.Company_Investor,
        Domicile: item.Domicile,
        Year_Of_Operation: item.Year_Of_Operation,
        Business: item.Business,
        Percentage_Ownership: item.Percentage_Ownership,
        Revenue: item.Revenue,
        Expense: item.Expense,
        Ebida: item.Ebida,
        Tax_Investment: item.Tax_Investment,
        Price_Asset: item.Price_Asset,
        Price_Liability: item.Price_Liability,
        Equity: item.Equity,
        COGS: item.COGS,
        Date_Of_Ownership: item.Date_Of_Ownership,
      }));
        
    
        try{
    
            await Investment.insertMany(Investments)
            res.status(200).json({status: "Investment saved"})
        }
        catch(error){
            console.error(error);
            next(res.status(500).json({error:"Investments not saved"}));
        }
})

app.get("/api/get/investment/forecast/:company/:investor/:domicile", async (req: Request, res: Response, next: NextFunction) => {
    try{
    const Company_Name = req.params.company ;
    const Company_Investor_Name = req.params.investor ;
    const Domicile_Name = req.params.domicile ;

    const notebookPath = path.join(__dirname, '../../prediction/company_forecast.ipynb');
    const outputNotebookPath = path.join(__dirname, '../../prediction/executed_company_forecast.ipynb');
    const imagesDir = path.join(__dirname, '../../images');

    const papermillCommand = `papermill "${notebookPath}" "${outputNotebookPath}" -p Company_Name "${Company_Name}" -p Company_Investor_Name "${Company_Investor_Name}" -p Domicile_Name "${Domicile_Name}"`;

    exec(papermillCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing notebook: ${error.message}`);
            res.status(500).json({ error: 'Notebook execution failed' });
            return;
        }

        console.log(`Notebook executed successfully: ${stdout}`);

        const imageFiles = [
            'Revenue.png',
            'Ebida.png',
            'Tax_Investment.png',
            'Price_Asset.png',
            'Price_Liability.png',
            'Equity.png',
            'COGS.png',
        ];

        res.status(200).json({
            images: imageFiles,
        });
    });
    } catch(error){
        console.error("Unhandled error:", error.message);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
});


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

//update
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

app.use("/images", express.static(path.join(__dirname, '../../images')));


app.listen(port,()=>(console.log(`server is running at port ${port}`)))