const express = require('express');
const http = require ('http');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const mongodbConnection = require('./config/mongoconnection.json');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const testRouter = require('./routes/test');
const quizRouter = require('./routes/quiz');
const questionRouter = require('./routes/question');
const postRouter = require('./routes/post');
const topicsRouter = require('./routes/topic');
const courseRouter = require('./routes/course');
const ordersRouter = require('./routes/orders');
const stripeRouter = require('./routes/stripe');
const cors = require('cors');

const app = express();

//base de donnée
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



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Middelware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/test', testRouter);
app.use('/quiz', quizRouter);
app.use('/question', questionRouter);
app.use('/topics', topicsRouter);
app.use('/users', usersRouter);
app.use('/post', postRouter);
app.use('/orders' , ordersRouter);
app.use('/courses' , courseRouter);
app.use('/checkout' , stripeRouter);

//creation du serveur
const server = http.createServer(app); 
server.listen(3001,()=>console.log("server is run")); //port

module.exports = app;