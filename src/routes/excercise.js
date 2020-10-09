const express = require('express');

const router = express.Router();

// POST /api/exercise/new-user
router.post('/new-user',(req,res) => {
    res.send(`new user POST Request`);
})

// POST /api/exercise/add
router.post('/add',(req,res) => {
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