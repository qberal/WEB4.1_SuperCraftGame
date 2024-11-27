require('dotenv').config();
const express = require('express');
const User = require('./model/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.static('../frontend'));



const fusion = require('./routers/fusion');  
app.use('/fusion', fusion);

const item = require('./routers/item');  
app.use('/item', item);



app.listen(port, () => {
    console.log(`Express app listening on port ${port}`);

    User.findById(1, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            console.log(user);
        }
    });
});

//test route

app.get('/test', (req, res) => {
    res.send('Hello World');
});