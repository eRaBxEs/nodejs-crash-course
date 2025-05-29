const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');


// express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb://adminUser:yourStrongPassword@localhost:27017/yourDatabaseName?authSource=admin';
mongoose.connect(dbURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// reister view engines
app.set('view engine', 'ejs');


// listen for requests
app.listen(3000);


// middleware & static files
app.use(express.static('public'));
// middleware & request logger
app.use(morgan('dev'));

app.get('/', (req, res) => {
    const blogs = [
        { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum sit amet consectetur' },
        { title: 'mario finds stairs', snippet: 'Lorem ipsum sit amet consectetur' },
        { title: 'How to defeat bowsor', snippet: 'Lorem ipsum sit amet consectetur' }
    ]

    res.render('index', { title: 'Home', blogs: blogs });
});


app.get('/about', (req, res) => {

    res.render('about', { title: 'About' });

});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create' });
});

// 404 page // mini basic middleware
app.use((req, res) => { // these code should always be at the bottom
    res.status(404).render('404', { title: 'Home' });
});