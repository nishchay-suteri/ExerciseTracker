const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const excerciseRouter = require('./routes/excercise');

const app = express();
dotenv.config();

app.use(cors({optionsSuccessStatus: 200}));
app.use('/api/excercise',excerciseRouter);

app.get('/', (req,res) => {
    res.send(`Exercise tracker`);
});

const LISTEN_PORT = process.env.PORT || 3000;
app.listen(LISTEN_PORT , ()=>console.log(`server is running on port ${LISTEN_PORT}`));