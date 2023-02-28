const express = require('express');
const http = require ('http');
const mongoose = require('mongoose')
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongodbConnection = require('./config/mongoconnection.json');
const indexRouter = require('./routes/index');
const topicsRouter = require('./routes/topic');
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



const app = express();
//connect to database
mongoose.connect(
    mongodbConnection.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("DataBase Connected");
      })
      .catch((err) => {
        console.log(err);
      }
);
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
app.use('/topics', topicsRouter);
app.use('/users', usersRouter);

//creation du serveur
const server = http.createServer(app); 
server.listen(3000,()=>console.log("server is run")); //port




module.exports = app;
