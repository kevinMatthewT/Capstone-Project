const mongoose=require("mongoose");

const investmentSchema = new mongoose.Schema({
    Company: {
      type: String,
      required: true,
    },
    Domicile: {
      type: String,
      required: true,
    },
    Year_Of_Operation: {
      type: Number,
      required: true,
    },
    Busienss_Type: {
      type: String,
      required: true,
    },
    Percentage_Ownership: {
      type: Number,
      required: true,
    },
    Price_Asset: {
      type: Number,
      required: true,
    },
    Date_Of_Ownership: {
      type: Date,
    },
  
  
  });
  
  const Investment = mongoose.model('investments', investmentSchema );
  
  module.exports = Investment;