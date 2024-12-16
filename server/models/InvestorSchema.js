const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  _id:{
    type:String,
  },
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
  Business: {
    type: String,
    required: true,
  },
  Percentage_Ownership: {
    type: Number,
    required: true,
  },
  Revenue: {
    type: Number,
    required: true,
  },
  Expense: {
    type: Number,
    required: true,
  },
  Ebida: {
    type: Number,
    required: true,
  },
  Tax_Investment: {
    type: Number,
    required: true,
  },
  Price_Asset: {
    type: Number,
    required: true,
  },
  Price_Liability: {
    type: Number,
    required: true,
  },
  Equity: {
    type: Number,
    required: true,
  },
  COGS:{
    type:Number,
    required:true
  },
  Date_Of_Ownership: {
    type: Date,
  },


});

const Investment = mongoose.model('Investment', investmentSchema, 'investments');

module.exports = Investment;