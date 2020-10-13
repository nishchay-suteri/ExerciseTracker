const moment = require('moment');
const Exercise = require('../models/Exercise');
const UserController = require('./UserController');
const mongoose = require('mongoose');

const createExcercise = async (req,res) => {
    let u_Id = req.body.userId;
    let desc = req.body.description;
    let dur_min = req.body.duration;
    if(isNaN(dur_min))
    {
        return res.send('Provide vaid duration in mins');
    }
    let dur_date = Date.now();
    if(req.body.date)
    {
        const isValidDate =  moment(req.body.date,"YYYY-M-D",true).isValid();
        if(isValidDate)
        {
            dur_date = new Date(req.body.date);
        }
        else
        {
            return res.send(`Provide Valid Date in YYYY-MM-DD Format`);
        }
    }
    try
    {
        let existedUser = await UserController.findUserById(u_Id);
        if(existedUser)
        {
            let newExcercise = new Exercise({
                userId: existedUser._id,
                description: desc,
                duration: dur_min,
                date: dur_date
            });
            try{
                let createdExcercise = await newExcercise.save();
                const response = {
                    username: existedUser.username,
                    description: createdExcercise.description,
                    duration: Number( createdExcercise.duration),
                    _id: createdExcercise.userId,
                    date: createdExcercise.date.toDateString()
                };
                return res.json(response);
            }
            catch(err){
                console.error(err);
                return res.status(400).send(`Server Error!`);
            }
        }
        else
        {
            return res.send(`Unknown UserId`);
        }
    }
    catch(err)
    {
        console.error(err);
        return res.status(400).send(`Server Error!`);
    }
}

/*
Person.
  find({ occupation: /host/ }).
  where('name.last').equals('Ghost').
  where('age').gt(17).lt(66).
  where('likes').in(['vaporizing', 'talking']).
  limit(10).
  sort('-occupation').
  select('name occupation').
  exec(callback);
*/
const getExcercises = async (req,res) => {
    let u_id = req.query.userId;
    let from = req.query.from;
    let to = req.query.to;
    let limit = req.query.limit;
    let find_query;
    if(u_id)
    {
        try
        {
            let existedUser = await UserController.findUserById(u_id);
            if(existedUser)
            {
                const idToCompare = new mongoose.Types.ObjectId(u_id);
                // Note: we could've modified the  {} inside every if-else and at the end call .find({..}).
                find_query = Exercise.find({userId: idToCompare});
                if(from){
                    const isValidDate =  moment(from,"YYYY-M-D",true).isValid();
                    if(!isValidDate)
                    {
                        return res.send(`Provide Valid from-Date in YYYY-MM-DD Format`);
                    }
                    let fromDate = new Date(from);
                    find_query.where('date').gte(fromDate);
                }
                if(to){
                    const isValidDate =  moment(to,"YYYY-M-D",true).isValid();
                    if(!isValidDate)
                    {
                        return res.send(`Provide Valid to-Date in YYYY-MM-DD Format`);
                    }
                    let toDate = new Date(to);
                    find_query.where('date').lte(toDate);
                }
                if(limit){
                    if(isNaN(limit))
                    {
                        return res.send(`Provide Valid limit number`);
                    }
                    let limit_val = parseInt(limit);
                    find_query.limit(limit_val);
                }
                const foundLogs = await find_query.exec();
                const tempExcercises = [];
                for(let i=0; i < foundLogs.length; i++)
                {
                    let log = foundLogs[i];
                    tempExcercises.push({description: log.description, duration: log.duration, date: log.date.toDateString()});
                }
                const response = {
                    _id: existedUser._id,
                    username: existedUser.username,
                    count: foundLogs.length,
                    log: tempExcercises
                }
                res.json(response);
            }
            else
            {
                return res.send(`Please provide Valid User ID`);
            }
        }
        catch(err)
        {
            console.error(err);
            return res.status(400).send(`Server Error!`);
        }
    }
    else
    {
        return res.send(`Please provide Valid User ID`);
    }
}

module.exports = {
    createExcercise,
    getExcercises
}