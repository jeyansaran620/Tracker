const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');

const express = require('express');
const mongoose = require('mongoose');

var session = require('express-session');
var FileStore = require('session-file-store')(session);


const port = process.env.PORT || 3000;

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3001'}));

app.use(bodyParser.json());

app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));


const url = 'mongodb://localhost:27017/Tracker';

const connect = mongoose.connect(url,{
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
  });

connect.then(() => {
    console.log('Connected correctly to server');
})
.catch((err) => console.log(err));


app.get('/login', (req, res, next) => {

  if(!req.session.user) {
    var authHeader = req.headers.authorization;
    
    if (!authHeader) {
      var err = new Error('You are not authenticated! sent header');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
    }
  
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var username = auth[0];
    var password = auth[1];
  
     if (username === "username" && password === "password") {
        req.session.user = 'authenticated';
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
          login: true
        });
      }
      else {
        let err = new Error('Your password is incorrect!');
        err.status = 403;
        return next(err);
      }
 
  }
  else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({
      login: true
    });
  }
});

app.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({
      logout: true
    });
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});


function auth (req, res, next) {

    console.log(req.session);

  if(!req.session) {
      var err = new Error('You are not the authenticated user!');
      err.status = 403;
      return next(err);
  }
  else {
    if (req.session.user === 'authenticated') {
      next();
    }
    else {
      let err = new Error('You are not authenticated!');
      err.status = 403;
      return next(err);
    }
  }
}

app.use(auth);

const ToolsRouter = require('./routes/ToolsRouter');

app.use('/tools', ToolsRouter);

const TypesRouter = require('./routes/TypesRouter');

app.use('/types', TypesRouter);

const CustomersRouter = require('./routes/CustomersRouter');

app.use('/customers', CustomersRouter);

app.get('*' ,(req,res) => {
  res.statusCode = 400;
  res.end("Bad Request path");
});

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server running at port ${port}/`);
});