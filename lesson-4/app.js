const express = require('express');


// express app
const app = express();

// listen for requests
app.listen(3000);

app.get('/', (req, res) => {

    // it infers the header information
    res.send('<p>home page</p>');
});


app.get('/about', (req, res) => {

    // it infers the header information
    res.send('<p>about page</p>');
});