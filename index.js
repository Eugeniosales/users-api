const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use('/api', require('./routes/Users'));


const PORT = 7100;

app.listen(PORT, console.log(`Server Started on Port ${PORT}`));