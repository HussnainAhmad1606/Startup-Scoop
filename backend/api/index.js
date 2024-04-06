// Import required modules
// Load environment variables from .env file

// Import necessary modules
const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const { cron } = require('../controllers/cron.js');
// Create an Express app
const app = express();
const port = 3001;
app.use(bodyParser.json());
app.use(cors())
app.use('/cron', cron);
// MongoDB connection string
const uri = process.env.MONGO_URI;


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
const sourceSchema = new mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String
    }
});
const newsItemSchema = new mongoose.Schema({
    source: {
        type: sourceSchema
    },
    title: {
        type: String,
       
    },
    author: {
        type: String
    },
    description: {
        type: String
    },
    url: {
        type: String
    },
    urlToImage: {
        type: String
    },
    pubishedAt: {
        type: String
    },
});

const newsSchema = new mongoose.Schema({
  date: {
      type: String
  },
  news: [newsItemSchema],
  createdAt: { type: Date, default: Date.now }

});

// Create a model for the blog post schema
const Newsletter = mongoose.model('Newsletter', newsletterSchema);

const News = mongoose.model('News', newsSchema);

mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB');
        
        // Start the Express server once MongoDB is connected
       
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
      
    let msg = `<p>Hi,</p> <br/><p>You have subscribed to Startup Scoop Newsletter. You will receive an email everyday about top headlines in startup space</p><p>Hope you enjoy it</p><p>Feel free to contact at hussnainahmad1606@gmail.com for any queries</p>`;
    try {
      var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.EMAIL_PASSWORD
          }
        });
        
        var mailOptions = {
          from: process.env.NODEMAILER_EMAIL,
          to: req.body.email,
          subject: `You have Subscribed to STARTUP SCOOP`,
          html: msg
        };
        
        await transporter.sendMail(mailOptions);
        console.log("Mails sent")
  
   
  
       
    } catch (err) {
        console.error('Error while sending welcome email: ', err);
    }
    res.status(201).json({type: "success", message: "Newsletter Subscribed"});

  } catch (err) {
    console.error('Error while subscribing to newsletter', err);
    res.status(500).json({type: "error", message: "Error while subscribing to newsletter"});
  }
});
app.get('/fetch-news', async (req, res) => {
  try {
    const req = await fetch(`https://newsapi.org/v2/top-headlines?q=Startup&sortBy=popularity&apiKey=${process.env.NEWS_API}`);

    const response = await req.json();
    console.log(response)
    const date = new Date().toLocaleDateString();
    
    const newNews = await News.create({date: date, news: response.articles});
    res.status(201).json({type: "success", message: "News Fetched"});
     
  } catch (err) {
      console.error('Error while getting news data', err);
      res.status(500).json({type: "error", message: "Error while getting news data"});
  }
});


app.get('/get-news', async (req, res) => {
  try {
    const date = new Date().toLocaleDateString();
  const news = await News.findOne({date: date}).sort({ date: -1 });

    res.status(201).json({type: "success", news:news});
     
  } catch (err) {
      console.error('Error while getting news data', err);
      res.status(500).json({type: "error", message: "Error while getting news data"});
  }
});
app.get('/send-mail', async (req, res) => {
    const date = new Date().toLocaleDateString();
    const news = await News.findOne({date: date}).sort({ date: -1 });

    var receivers = [];

    const subsribers = await Newsletter.find({});
    console.log(subsribers)
    for (let i = 0; i < subsribers.length; i++) {
      receivers.push(subsribers[i].email)
    }
    

    let msg = `<p>Hi,</p> <br/><p>We hope this email finds you well and that you're having a fantastic day! Let's get started with today's top headlines in startup</p>`;
    news.news.map((newss) => {
        let newNews = `<img src='${newss.urlToImage}'/><h1>${newss.title}</h1><p>${newss.description}</p><a href='${newss.url}'>Read Full</a><hr/>`
        msg = msg + newNews;
    })

    let credit = `<h3>News Provided by: Startup Scoop</h3><br/><h3>Cod3d by: Psycho</h3>`;

    msg = msg + credit;
  try {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.EMAIL_PASSWORD
        }
      });
      
      var mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: receivers,
        subject: `Startup Scoop - News for ${news.date}`,
        html: msg
      };
      
      await transporter.sendMail(mailOptions);
      console.log("Mails sent")

      res.status(200).json({type: "success", message: "Emails Sent"});

     
  } catch (err) {
      console.error('Error while getting news data', err);
      res.status(500).json({type: "error", message: "Error while sending mail"});
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

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
module.exports = app;