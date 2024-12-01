require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/images', express.static('public/images'));

const register = require('./routers/register');
app.use('/', register);

const login = require('./routers/login');
app.use('/', login);

const infinity = require('./routers/infinity');
app.use('/infinity', infinity);

const normal = require('./routers/normal');
app.use('/normal', normal);

/*
Sont utilisés dans /normal.js

const fusion = require('./routers/fusion');
app.use('/fusion', fusion);

const item = require('./routers/item');  
app.use('/item', item);

const inventory = require('./routers/inventory');
app.use('/inventory', inventory);
*/


//const mergeWords = require('./words.js');

app.listen(port, () => {
    console.log(`Express app listening on port ${port}`);
});