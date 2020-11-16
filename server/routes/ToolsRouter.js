const express = require('express');
const bodyParser = require('body-parser');

const Tools = require('../schemas/tools');
const Types = require('../schemas/types');

const ToolsRouter = express.Router();

ToolsRouter.use(bodyParser.json());

ToolsRouter.route('/')
.get((req,res,next) => {
    Tools.find({})
    .then((Tools) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Tools);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Tools.create(req.body)

    .then((tool) => {

        Types.findById(tool.type)
        .then((type) => {
        if (type !== null) {
            type.tools.push(tool._id);
            type.save()
            .then((type) => {
                console.log('Tool Created ', tool,'Type Updated', type);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(tool);                
            }, (err) => next(err));
        }
        else {

            let err = new Error('Type ' + tool.type + ' not found');
            Tools.findByIdAndRemove(tool._id);
            err.status = 400;
            return next(err);
        }
    }, (err) => next(err))

        .catch((err) => next(err));

    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Tools');
})
.delete((req, res, next) => {
    Tools.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

ToolsRouter.route('/list')
.get((req,res,next) => {
    Tools.find({},{_id:1})
    .then((Tools) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Tools);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /tools/list');
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /tools/list');
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /tools/list');
});


ToolsRouter.route('/rented')
.get((req,res,next) => {
    Tools.find({available:false},{_id:1})
    .then((Tools) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Tools);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /tools/rented');
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /tools/rented');
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /tools/rented');
});

ToolsRouter.route('/available')
.get((req,res,next) => {
    Tools.find({available:true},{_id:1})
    .then((Tools) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Tools);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /tools/rented');
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /tools/rented');
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /tools/rented');
});

ToolsRouter.route('/:toolId')
.get((req,res,next) => {
    Tools.findById(req.params.toolId)
    .then((tool) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(tool);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /Tools/'+ req.params.toolId);
})
.put((req, res, next) => {

    Tools.findByIdAndUpdate(req.params.toolId, {
        $set: req.body
    }, { new: true })
    .then((tool) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(tool);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Tools.findByIdAndRemove(req.params.toolId)
    .then((resp) => {

        Types.findById(resp.type)
        .then((type) => {
                type.tools = type.tools.filter(tool => tool.localeCompare(resp._id) !== 0 );
                type.save();
        }, (err) => next(err))
        .catch((err) => next(err)); 

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);

    }, (err) => next(err))
    .catch((err) => next(err));
});


ToolsRouter.route('/:toolId/rentals')
.get((req,res,next) => {
    Tools.findById(req.params.toolId)
    .then((tool) => {
        if (tool !== null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(tool.rentals);
        }
        else {
            let err = new Error('Tool ' + req.params.toolId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Tools.findById(req.params.toolId)
    .then((tool) => {
        if (tool !== null) {
            if (tool.available === true)
            {
                tool.rentals.push(req.body);
                tool.available = false;
                tool.save()
                .then((tool) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(tool);                
                }, (err) => next(err));
            }
            else {
                let err = new Error('Tool ' + req.params.toolId + ' is not available');
                err.status = 400;
                return next(err);   
            }
        }
        else {
            let err = new Error('Tool ' + req.params.toolId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    Tools.findById(req.params.toolId)
    .then((tool) => {

        if (tool !== null) {

                if (tool.available === true) {

                    let err = new Error('Tool ' + req.params.toolId + ' already Returned');
                      err.status = 400;
                      return next(err);

                  }

            tool.rentals.id(tool.rentals[tool.rentals.length - 1]._id).dateReturned = req.body.dateReturned;
            tool.available = true;

            tool.save()
            .then((tool) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(tool);                
            }, (err) => next(err));
        }
        else {
          let err = new Error('tool ' + req.params.toolId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Tools.findById(req.params.toolId)
    .then((tool) => {
        if (tool !== null) {
            tool.rentals = [];
            tool.save()
            .then((tool) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(tool);                
            }, (err) => next(err));
        }
        else {
           let err = new Error('tool ' + req.params.toolId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));    
});

ToolsRouter.route('/:toolId/rentals/:rentalId')
.get((req,res,next) => {
    Tools.findById(req.params.toolId)
    .then((tool) => {
        if (tool !== null && tool.rentals.id(req.params.rentalId) !== null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(tool.rentals.id(req.params.rentalId));
        }
        else if (tool === null) {
           let err = new Error('tool ' + req.params.toolId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
           let err = new Error('rental ' + req.params.rentalId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /Tools/'+ req.params.toolId
        + '/rentals/' + req.params.rentalId);
})
.put((req, res, next) => {
    Tools.findById(req.params.toolId)
    .then((tool) => {
        if (tool !== null && tool.rentals.id(req.params.rentalId) !== null) {
            if (req.body.dateReturned) {

                if (tool.available === true) {

                    let err = new Error('Tool ' + req.params.toolId + 'already Returned');
                      err.status = 400;
                      return next(err);

                  }
                tool.rentals.id(req.params.rentalId).dateReturned = req.body.dateReturned;
                tool.available = true;
            }
            tool.save()
            .then((tool) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(tool);                
            }, (err) => next(err));
        }
        else if (tool == null) {
          let err = new Error('tool ' + req.params.toolId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
           let err = new Error('Rental ' + req.params.rentalId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Tools.findById(req.params.toolId)
    .then((tool) => {
        if (tool !== null && tool.rentals.id(req.params.rentalId) !== null) {
            tool.rentals.id(req.params.rentalId).remove();
            tool.save()
            .then((tool) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(tool);                
            }, (err) => next(err));
        }
        else if (tool == null) {
           let err = new Error('tool ' + req.params.toolId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
           let err = new Error('Rental ' + req.params.rentalId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = ToolsRouter;