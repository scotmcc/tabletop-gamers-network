require('dotenv').config();

const fs = require('fs');
const path = require('path');
const http = require('http');

const uuid = require('uuid/v4');

const morgan = require('morgan');
const helmet = require('helmet');

const lessMiddleware = require('less-middleware');

const express = require('express');
const socket = require('socket.io');

const expressSession = require('express-session');
const socketSession = require('express-socket.io-session');

const mongoose = require('mongoose');
const connectMongo = require('connect-mongo');

const routeList = require('express-routes-catalogue');

const app = express();
const server = http.Server(app);
const io = socket(server);
const port = process.env.PORT || 3000;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const MongoStore = connectMongo(expressSession);
const session = expressSession({
  secret: uuid(),
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 60 * 60
  })
});

const accessLogStream = fs.createWriteStream(path.join(process.env.PWD, 'access.log'), {
  flags: 'a'
});

const aboutRouter = require('./routes/about');
const authRouter = require('./routes/auth');
const gamesRouter = require('./routes/games');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');

mongoose.model('User', require('./models/user.js'));
mongoose.model('Game', require('./models/game.js'));

function mongooseError(error) {
  console.error(error);
}
mongoose.connection.on('error', mongooseError);

function socketConnect(socket) {
  socket.on('message', function(message) {
    console.log('socket.send api', message);
  });
  socket.on('join', function(message) {
    if (!socket.handshake.session.tracker) {
      socket.handshake.session.tracker = uuid();
    }
    socket.handshake.session.userdata = message;
    socket.handshake.session.save();
  });
  socket.on('login', data => console.log('login', data));
}
io.on('connection', socketConnect);

function mongooseConnection() {
  if (process.env.NODE_ENV === 'development') {
    routeList.default.terminal(app);
    console.log('.-------------------.');
    console.log('|  List All Models  |');
    console.log('|-------------------|');
    for (let model in mongoose.models) {
      var spaces = (19 - model.length) / 2;
      var before = spaces % 2 === 0 ? spaces : Math.round(spaces);
      var after = spaces % 2 === 0 ? spaces : Math.round(spaces) + 1;
      var buffer = ['|', new Array(before).join(' '), model, new Array(after).join(' '), '|'];
      console.log(buffer.join(''));
    }
    console.log('|-------------------|');
  }
  server.listen(port, () => console.log(`App listening on port ${port}`));
}
mongoose.connection.on('open', mongooseConnection);

function startServer() {
  mongoose.model('User', require('./models/user'));

  app.set('view engine', 'pug');

  app.use(helmet());
  app.use(morgan('tiny', { stream: accessLogStream }));

  app.use(lessMiddleware('./public'));
  app.use(express.static('./public/', { index: false }), express.urlencoded({ extended: true }));
  app.use(express.static('./vendor/', { index: false }), express.urlencoded({ extended: true }));

  app.use(session);
  io.use(socketSession(session, { autosave: true }));

  app.use((req, res, next) => {
    if (!req.session.tracker) {
      req.session.tracker = uuid();
    }
    next();
  });

  app.use('/', indexRouter(mongoose, io));
  app.use('/about', aboutRouter(mongoose, io));
  app.use('/auth', authRouter(mongoose, io));
  app.use('/games', gamesRouter(mongoose, io));
  app.use('/user', userRouter(mongoose, io));

  app.use('*', (req, res) => {
    res.status(404).render('404');
  });

  mongoose.connect(process.env.MONGODB);
}

startServer();
