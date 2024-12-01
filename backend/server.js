require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

app.use(
    session({
        secret: 'your-secret-key',
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 1 day
            httpOnly: true,
        },
    })
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    credentials: true,
    origin: true
}));

app.use('/images', express.static('public/images'));

const register = require('./routers/register');
app.use('/', register);

const login = require('./routers/login');
app.use('/', login);

const logout = require('./routers/logout');
app.use('/', logout);

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