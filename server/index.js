const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');

const express = require('express');
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/Tracker';

const connect = mongoose.connect(url,{
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
  });

connect.then(() => {
    console.log('Connected correctly to server');
});

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(bodyParser.json());

const ToolsRouter = require('./routes/ToolsRouter');

app.use('/tools', ToolsRouter);

const TypesRouter = require('./routes/TypesRouter');

app.use('/types', TypesRouter);

const CustomersRouter = require('./routes/CustomersRouter');

app.use('/customers', CustomersRouter);


const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server running at port ${port}/`);
});