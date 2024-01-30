const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express(); //creates instance of express
const PORT = process.env.PORT || 5050; //sets server port

app.use(cors()); //configures middleware
app.use(express.json()); //parses incoming json

//connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_DB_URL, { //connects to MongoDB
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB Atlas');
});

//create a schema for the data
const dataSchema = new mongoose.Schema({
  dateCreated: { type: Date, default: Date.now },
  dataType: String,
  dataList: [Number],
});

//create a model based on the schema
const Data = mongoose.model('Data', dataSchema);

//API endpoint to add data to the database
app.post('/api/upload', async (req, res) => {
  try {
    const newData = await Data.create(req.body);
    res.json(newData);
  } catch (error) {
    console.error('Error uploading data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//API endpoint to get all data from the database
app.get('/api/view', async (req, res) => {
  try {
    const allData = await Data.find();
    res.json(allData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//API endpoint to delete data from the database
app.delete('/api/delete/:id', async (req, res) => {
  try {
    const deletedData = await Data.findByIdAndDelete(req.params.id);
    res.json(deletedData);
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//starts Express server and listens on a specific point
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
