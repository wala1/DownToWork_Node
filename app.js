const express = require('express');
const http = require ('http');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

(async () => {
    try {
      mongoose.set('strictQuery', false);
      const db = await mongoose.connect(process.env.mongo_URL);
      console.log("Db connected to", db.connection.name);
    } catch (error) {
      console.error(error);
    }
  })();

const indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Middelware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//creation du serveur
const server = http.createServer(app); 
server.listen(3000,()=>console.log("server is run")); //port




module.exports = app;