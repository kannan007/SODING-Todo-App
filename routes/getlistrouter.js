var express=require('express');
var bodyParser=require('body-parser');
var mongoose = require('mongoose');
var LIST=require('../models/todolist');

var GETLISTrouter=express.Router();
GETLISTrouter.route('/')
.get(function(req,res,next) {
	LIST.find({},function (err, items) {
      if (err) throw err;
      res.json(items);
    });
})
.post(function (req, res, next) {
    LIST.create(req.body, function (err, question) {
        if (err) throw err;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added A new item');
    });
});
GETLISTrouter.route('/:listId')
.get(function(req,res,next) {
    LIST.findById(req.params.listId,function(err,item) {
        res.send(item);
    })
})
.delete(function(req,res,next) {
    LIST.findByIdAndRemove(req.params.listId,function(err,item) {
        if (err) throw err;
        res.end("Deleted Successfully");
    })
})
.put(function(req,res,next) {
    LIST.findByIdAndUpdate(req.params.listId, { $set: req.body}, {new:true}, function(err,item) {
        if(err) throw err;
        console.log(item);
        res.send(item);
    })
});
module.exports=GETLISTrouter;