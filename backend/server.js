// Import required modules
const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const mongoose = require("mongoose")
// Create an Express app
const app = express();
const port = 3000;
app.use(bodyParser.json());
// MongoDB connection string
const uri = 'mongodb://localhost:27017';

// Define the schema for a blog post
const newsletterSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  email: {
      type: String,
      required: true
  }
});

// Create a model for the blog post schema
const Newsletter = mongoose.model('Newsletter', newsletterSchema);

mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB');
        
        // Start the Express server once MongoDB is connected
        app.listen(port, () => {
            console.log(`Server is listening at http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

// Define routes and middleware
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/subscribe', async (req, res) => {
  try {
      console.log(req.body)
      const newSubscriber = await Newsletter.create({ name: req.body.name, email: req.body.email });
      res.status(201).json(newSubscriber);
  } catch (err) {
      console.error('Error while subscribing to newsletter', err);
      res.status(500).send('Internal Server Error');
  }
});

app.get('/get-subscribers', async (req, res) => {
  try {
   
      const subscribers = await Newsletter.find({});
      res.status(200).json(subscribers);
  } catch (err) {
      console.error('Error while getting newsletter data', err);
      res.status(500).send('Internal Server Error');
  }
});

