require('dotenv').config();
const express = require('express');
const User = require('./model/user');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.static('../frontend'));
app.use(bodyParser.json());

const registerRoutes = require('./routes/register');
app.use('/', registerRoutes);

const loginRoutes = require('./routes/login');
app.use('/', loginRoutes);

// run the server
app.listen(port, () => {
    // callback executed when the server is launched
    console.log(`Express app listening on port ${port}`);
});


