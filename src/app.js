const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

// Warning Resolution
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);

const excerciseRouter = require('./routes/excercise');

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_URI, ()=>console.log(`Connected to DB!`));

app.use(cors({optionsSuccessStatus: 200}));
app.use(express.json());
app.use('/api/excercise',excerciseRouter);

app.get('/', (req,res) => {
    res.send(`Exercise tracker`);
});

const LISTEN_PORT = process.env.PORT || 3000;
app.listen(LISTEN_PORT , ()=>console.log(`server is running on port ${LISTEN_PORT}`));