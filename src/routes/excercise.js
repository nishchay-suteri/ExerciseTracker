const express = require('express');
const User = require('../models/User');
const Excercise = require('../models/Excercise');

const router = express.Router();

// POST /api/exercise/new-user
// @return {"username":"testing","_id":"5f8186fe2e4b4c2d4f3f695f"}
router.post('/new-user',async (req,res) => {
    let userName = req.body.username;
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
                    username: existedUser.userName,
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
router.get('/log',(req,res) => {
    res.send(`log GET Request`);
})

module.exports = router;