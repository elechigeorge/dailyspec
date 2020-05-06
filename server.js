// import libraries
const express = require('express');
require('dotenv').config()
const morgan = require('morgan');
const mongoose = require('mongoose');

// initial the app
const server = express();
// connect to database
mongoose
    .connect(process.env.DB_STRING, { useNewUrlParser: true, 
        useUnifiedTopology: true, useCreateIndex: true })
    .then(response => console.log('Database Connected...'))
    .catch(error => console.log("Connection Error" + error))

// initialise middle wares
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
morgan('dev');

server.use('/todos', require('./api/Todo'));

// listen on port
server.listen(process.env.PORT, () => 
    console.log(`Server Running On http://localhost:${process.env.PORT}`))