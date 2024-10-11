import express, {Express, Request, Response } from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import Investment from './models/InvestorSchema';

dotenv.config();

const app: Express=express();
const port = process.env.PORT;
app.use(express.json());
const ConnectionString = process.env.CONNECTION_DETAILS;

mongoose.connect("mongodb://localhost:27017/techasia")
.then(()=>(console.log("connected")))
.catch((err)=>(console.log(err)))

app.get('/', (req : Request, res: Response)=>{
    res.send("hello from the backend")
})

app.listen(port,()=>(console.log(`server is running at port ${port}`)))