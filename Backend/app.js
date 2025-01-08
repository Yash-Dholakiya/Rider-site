const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');


connectToDb();

app.use(cors());
app.use(express.json());    // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));    // Parse URL-encoded bodies

app.get('/', (req, res) => { 
    res.send('Hello Yash Dholakiya.');
});

app.use('/users', userRoutes);   // Use user routes


module.exports = app;

