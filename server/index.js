require('dotenv').config();

var Express = require('express');
var MongoClient = require('mongodb').MongoClient;
// var multer= require('multer');
var mongoose = require('mongoose');

var cors= require('cors');

var app= Express();
app.use(cors());

const ConnectionName=process.env.CONNECTION_DETAILS;

const Investment = require('./models/InvestorSchema.js');


console.log(ConnectionName)

mongoose.connect(ConnectionName)
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch(err => console.error('Failed to connect to MongoDB', err));
 

app.get('/', (req, res) => {
    res.send('Hello, MongoDB with Express!');
});


app.get('/investments', async (req, res) => {
    try {
      const investments = await Investment.find();  // Query the investments collection
      res.status(200).json(investments);
    } catch (error) {
      console.error('Error fetching investments:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});
  
const PORT = 8080;
  
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
 });


