const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

// Warning Resolution
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);

const excerciseRouter = require('./routes/exercise');

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_URI, ()=>console.log(`Connected to DB!`));

app.use(express.static(path.join(__dirname,'../public'))); // To Serve Static contents

app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')
app.use(cors({optionsSuccessStatus: 200}));
app.use(express.json()); // Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({extended: true})); // Parse URL-encoded bodies (as sent by HTML forms)
app.use('/api/exercise',excerciseRouter);

app.get('/', (req,res) => {
    res.render(`index`);
});

const LISTEN_PORT = process.env.PORT || 3000;
app.listen(LISTEN_PORT , ()=>console.log(`server is running on port ${LISTEN_PORT}`));