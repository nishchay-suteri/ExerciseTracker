const express = require('express');
const User = require('../models/User');
const Excercise = require('../models/Excercise');
const mongoose = require('mongoose')

const router = express.Router();

// POST /api/exercise/new-user
// @return {"username":"testing","_id":"5f8186fe2e4b4c2d4f3f695f"}
router.post('/new-user',async (req,res) => {
    let userName = req.body.username;
    // TODO: check username is passed or not
    try
    {
        let isUserExist = await User.findOne({username: userName});
        if(isUserExist)
        {
            return res.send(`Username ${userName} already taken`);
        }
        else
        {
            const newUser = new User({
                username: userName
            });
            try{
                const createdUser = await newUser.save();
                const response = {username: createdUser.username, _id: createdUser._id.toString()};
                return res.json(response);
            }
            catch(err)
            {
                console.error(err);
                return res.status(400).send(`Server Error!`);
            }
        }
    }
    catch(err)
    {
        console.error(err);
        return res.status(400).send(`Server Error!`);
    }
})

// POST /api/exercise/add
// @return {"_id":"5f817b2d2e4b4c2d4f3f6956","username":"testing","date":"Sat Oct 10 2020","duration":2,"description":"hi"}
router.post('/add',async (req,res) => {
    let u_Id = req.body.userId;
    let desc = req.body.description;
    let dur_min = req.body.duration;
    let dur_date = Date.now();
    if(req.body.date)
    {
        // TODO: Validate Date
        dur_date = new Date(req.body.date);
        // console.log(dur_date.toString());
    }
    try
    {
        let existedUser = await User.findById({_id: u_Id});
        if(existedUser)
        {
            let newExcercise = new Excercise({
                userId: existedUser._id,
                description: desc,
                duration: dur_min,
                date: dur_date
            });
            try{
                let createdExcercise = await newExcercise.save();
                const response = {
                    _id: createdExcercise.userId,
                    username: existedUser.username,
                    date: createdExcercise.date.toString(),
                    duration: createdExcercise.duration,
                    description: createdExcercise.description
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
    
    res.send(`Add POST Request`);
})

// GET /api/exercise/log?{userId}[&from][&to][&limit]
/*
 * { } = required, [ ] = optional
 * from, to = dates (yyyy-mm-dd); limit = number
*/
// @return {"_id":"5f817b2d2e4b4c2d4f3f6956","username":"testiiiiiinggg","count":3,"log":[{"description":"hi","duration":2,"date":"Sat Oct 10 2020"}]}
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
router.get('/log',async (req,res) => {
    let u_id = req.query.userId;
    let from = req.query.from;
    let to = req.query.to;
    let limit = req.query.limit;
    let find_query;
    if(u_id)
    {
        try
        {
            let existedUser = await User.findById({_id: u_id});
            if(existedUser)
            {
                const idToCompare = new mongoose.Types.ObjectId(u_id);
                // Note: we could've modified the  {} inside every if-else and at the end call .find({..}).
                find_query = Excercise.find({userId: idToCompare});
                if(from){
                    // TODO: Validate Date
                    let fromDate = new Date(from);
                    find_query.where('date').gte(fromDate);
                }
                if(to){
                    // TODO: Validate Date
                    let toDate = new Date(to);
                    find_query.where('date').lte(toDate);
                }
                if(limit){
                    let limit_val = parseInt(limit);
                    find_query.limit(limit_val);
                }
                const foundLogs = await find_query.exec();
                const tempExcercises = [];
                for(let i=0; i < foundLogs.length; i++)
                {
                    let log = foundLogs[i];
                    tempExcercises.push({description: log.description, duration: log.duration, date: log.date.toString()});
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
})

module.exports = router;