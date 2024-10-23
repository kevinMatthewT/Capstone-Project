import mongoose,{Schema, Document, Model} from "mongoose";

type InvestmentType = Document & {
Company: string,
  Domicile: string,
  Year_Of_Operation:number,
  Business: string,
  Percentage_Ownership:number,
  Price_Asset:number,
  Date_Of_Ownership:Date
}

const investmentSchema : Schema<InvestmentType>= new Schema({
  Company: String,
  Domicile: String,
  Year_Of_Operation:Number,
  Business: String,
  Percentage_Ownership:Number,
  Price_Asset:Number,
  Date_Of_Ownership:Date
});

const Investment :Model<InvestmentType> =mongoose.model<InvestmentType>("Investment",investmentSchema,"investments");

export default Investment;