require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

app.use(
    session({
        secret: process.env.SESSION_SECRET_KEY,
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
    origin: true,
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

app.listen(port, () => {
    console.log(`Express app listening on port ${port}`);
});