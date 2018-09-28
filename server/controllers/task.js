const Task = require('../models/task')
var jwt = require('jsonwebtoken');
require('dotenv').config()

const getHastag = function(hashtag){
    let strings = hashtag.split("#")
    let tags = strings.reduce(function(a, b){
        if(b){
            let tag = b.trim()
            if(tag){
                a.push(tag)
            }
        }
        return a
    }, [])
    return tags
}

const get = function(req, res){
    jwt.verify(req.headers.token, process.env.tokenSecretKey, function(err, decoded) {
        if(err) res.status(401).json({msg:err.message})

        let userId = decoded.id
        
        Task
        .find({
            userId:userId
        })
        .populate("userId", ["name", "email"])
        .then(function(task){
            res
            .status(200)
            .json({task})
        })
        .catch(function(err){
            res
            .status(400)
            .json({
                msg: err.message
            })
        })      
    });
    
}

const add = function(req, res){
    jwt.verify(req.headers.token, process.env.tokenSecretKey, function(err, decoded) {
        if(err) res.status(401).json({msg:"is not user"})
        
        let hashtag = getHastag(req.body.tag)

        Task
        .create({
	        title:req.body.title,
            task:req.body.task,
            tag: hashtag,
            status:false,
            deadline:new Date(req.body.deadline),
            userId: decoded.id,
        })
        .then(function(task){
            //add google calender
            res
                .status(200)
                .json({
                    msg : "task has been created",
                    task : task
                })
        })
        .catch(function(err){
            res
                .status(400)
                .json({
                    msg : err.message,
                })
        })   
    });
    
}

const edit = function(req, res){
    jwt.verify(req.headers.token, process.env.tokenSecretKey, function(err, decoded) {
        if(err) res.status(401).json({msg:"is not user"})
            console.log(req.query.id)
            Task
            .findById(req.query.id)
            .then(function(task){
                tag = getHastag(req.body.tag)                
                Task
                .findByIdAndUpdate(task.id,{
		            title:req.body.title,
                    task:req.body.task,
                    tag: tag,
                    status:req.body.status,
                    deadline:req.body.deadline
                })
                .then(function(task){
                    res
                        .status(200)
                        .json({
                            msg : "update succesfully",
                            task : task
                        })
                })
                .catch(function(err){
                    res
                        .status(400)
                        .json({
                            msg:err.message
                        })
                })

            })
            .catch(function(err){
                res
                    .status(400)
                    .json({
                        msg: err. message
                    })
            })

    })
    
}

const remove = function(req, res){
   
    jwt.verify(req.headers.token, process.env.tokenSecretKey, function(err, decoded) {
        if(err) res.status(401).json({msg:"is not user"})
        Task
        .findByIdAndRemove(req.query.id)
        .then(function(task){
            res
                .status(200)
                .json({
                    msg: "remove  task successfully",
                    task : task
                })
        })
        .catch(function(err){
            res
                .status(400)
                .json({
                    msg: err.message
                })
        })
    
    })
    
}

const taskStatus = function(req, res){
    
}


module.exports = {
    get,
    add,
    remove,
    edit,
}
