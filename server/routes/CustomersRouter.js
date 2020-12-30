const express = require('express');
const bodyParser = require('body-parser');

const Customers = require('../schemas/customers');

const CustomersRouter = express.Router();

CustomersRouter.use(bodyParser.json());

CustomersRouter.route('/')
.get((req,res,next) => {
    Customers.find({})
    .then((Customers) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Customers);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Customers.create(req.body)
    .then((cus) => {
        console.log('Customer Created ', cus);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(cus);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Customers');
})
.delete((req, res, next) => {
    Customers.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

CustomersRouter.route('/list')
.get((req,res,next) => {
    Customers.find({},{_id:1,mailId:1})
    .then((Customers) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Customers);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /Customers/list');
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Customers/list');
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Customers/list');
});

CustomersRouter.route('/:customerID')
.get((req,res,next) => {
    Customers.findById(req.params.customerID)
    .then((cus) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(cus);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /Customers/'+ req.params.customerID);
})
.put((req, res, next) => {
    Customers.findByIdAndUpdate(req.params.customerID, {
        $set: req.body
    }, { new: true })
    .then((cus) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(cus);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Customers.findByIdAndRemove(req.params.customerID)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = CustomersRouter;