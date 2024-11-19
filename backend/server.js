const express = require('express');
const app = express();

const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.static('../frontend'));


app.listen(port, () => {
    console.log(`Express app listening on port ${port}`);
});
