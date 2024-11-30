import mongoose,{Schema, Document, Model, ObjectId} from "mongoose";

type InvestmentType = Document & {
  _id:ObjectId,
  Company: string,
  Company_Investor: string, 
  Domicile: string,
  Year_Of_Operation:number,
  Business: string,
  Percentage_Ownership:number,
  Revenue:number,
  Expense:number,
  Ebida:number,
  Tax_Investment:number,
  Price_Asset:number,
  Price_Liability:number,
  Equity:number,
  Date_Of_Ownership:Date
}

const investmentSchema : Schema<InvestmentType>= new Schema({
  Company: String,
  Company_Investor: String,
  Domicile: String,
  Year_Of_Operation:Number,
  Business: String,
  Percentage_Ownership:Number,
  Revenue:Number,
  Expense:Number,
  Ebida:Number,
  Tax_Investment:Number,
  Price_Asset:Number,
  Price_Liability:Number,
  Equity:Number,
  Date_Of_Ownership:Date
});

const Investment :Model<InvestmentType> =mongoose.model<InvestmentType>("Investment",investmentSchema,"investments");

export default Investment;