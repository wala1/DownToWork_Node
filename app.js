const express = require('express');
const http = require ('http');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const socketio = require('socket.io')
const gameLogic = require('./game/game-logic')

const mongodbConnection = require('./config/mongoconnection.json');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const testRouter = require('./routes/test');
const quizRouter = require('./routes/quiz');
const questionRouter = require('./routes/question');
const trialRouter = require('./routes/trial');
const postRouter = require('./routes/post');
const productRouter = require('./routes/product');
const topicsRouter = require('./routes/topic');
const courseRouter = require('./routes/course');
const ordersRouter = require('./routes/orders');
const stripeRouter = require('./routes/stripe');
const chatRouter = require('./routes/chat');
const mediaRoutes = require("./routes/media");
const videoRouter = require("./routes/video");

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
app.use('/trial', trialRouter);
app.use('/topics', topicsRouter);
app.use('/users', usersRouter);
app.use('/post', postRouter);
app.use('/orders' , ordersRouter);
app.use('/courses' , courseRouter);
app.use('/checkout' , stripeRouter);
app.use('/chat', chatRouter);
app.use('/product', productRouter);
app.use('/uploads',express.static('uploads'))
app.use('/api/v1/media', mediaRoutes);
app.use('/videosCourses', videoRouter);
app.use(express.static('public'));

//creation du serveur
const server = http.createServer(app); 
const io = socketio(server)
// get the gameID encoded in the URL. 
// check to see if that gameID matches with all the games currently in session. 
// join the existing game session. 
// create a new session.  
// run when client connects

io.on('connection', client => {
  gameLogic.initializeGame(io, client)
})

server.listen(3001,()=>console.log("server is run")); //port

module.exports = app;