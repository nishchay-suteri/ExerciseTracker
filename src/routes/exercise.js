const express = require('express');
const UserController = require('../controllers/UserController');
const ExcerciseController = require('../controllers/ExcerciseController');

const router = express.Router();

// POST /api/exercise/new-user
// @return {"username":"testing","_id":"5f8186fe2e4b4c2d4f3f695f"}
router.post('/new-user', UserController.createNewUser);

// POST /api/exercise/add
// @return {"_id":"5f817b2d2e4b4c2d4f3f6956","username":"testing","date":"Sat Oct 10 2020","duration":2,"description":"hi"}
router.post('/add', ExcerciseController.createExcercise);

// GET /api/exercise/log?{userId}[&from][&to][&limit]
/*
 * { } = required, [ ] = optional
 * from, to = dates (yyyy-mm-dd); limit = number
*/
// @return {"_id":"5f817b2d2e4b4c2d4f3f6956","username":"testiiiiiinggg","count":3,"log":[{"description":"hi","duration":2,"date":"Sat Oct 10 2020"}]}
router.get('/log', ExcerciseController.getExcercises);

router.get('/users', UserController.getAllUsers);

module.exports = router;