require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('../frontend'));
app.use(cors());

const register = require('./routers/register');
app.use('/', register);

const login = require('./routers/login');
app.use('/', login);

const fusion = require('./routers/fusion');  
app.use('/fusion', fusion);

const item = require('./routers/item');  
app.use('/item', item);

const infinity = require('./routers/infinityRouter');
app.use('/infinity', infinity);



//const mergeWords = require('./words.js');

app.listen(port, () => {
    console.log(`Express app listening on port ${port}`);
});