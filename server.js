//server.js
// Menoko OG- created 4-24-24
// dependencies
require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require ('cors');
const morgan = require('morgan');
const ticketRoutes = require('./routes/ticketRouter');

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// connection to database function 
const connectToDb = async () => {
    try {
     await mongoose.connect(process.env.MONGODB_SECRET)   
     console.log("Connected to the MongoDB")
    } catch (error) {
        console.log(error)
    }
}

// calling the connection to database function 
connectToDb() 


// routes
app.use('/api', ticketRoutes);


//error handler
app.use((err, req, res, next) => {
    console.log(err);
    return res.send({ errMsg: err.message });
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})







