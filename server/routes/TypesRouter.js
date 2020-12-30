const express = require('express');
const bodyParser = require('body-parser');

const Types = require('../schemas/types');
const Tools = require('../schemas/tools');

const TypesRouter = express.Router();

TypesRouter.use(bodyParser.json());

TypesRouter.route('/')
.get((req,res,next) => {
    Types.find({})
    .then((Types) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Types);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Types.create(req.body)
    .then((type) => {
        console.log('Dish Created ', type);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(type);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Types');
})
.delete((req, res, next) => {
    Types.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});


TypesRouter.route('/:typeID')
.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /Types/'+ req.params.typeID);
})
.put((req, res, next) => {
    Types.findByIdAndUpdate(req.params.typeID, {
        $set: req.body
    }, { new: true })
    .then((type) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(type);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Types.findByIdAndRemove(req.params.typeID)
    .then((resp) => {

        Tools.remove({type:resp._id})
        .then(() =>
        {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));

    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = TypesRouter;