require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.static('../frontend'));

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

//test route

app.get('/test', (req, res) => {
    res.send('Hello World');
});