const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

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
app.use(express.urlencoded({ extended: true }));
// middleware & request logger
app.use(morgan('dev'));



app.get('/', (req, res) => {

    res.redirect('/blogs');
});


app.get('/about', (req, res) => {

    res.render('about', { title: 'About' });

});


// blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('details', { blog: result, title: 'Blog Details' });
        })
        .catch((err) => {
            console.log(err);
        })
});


app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a blog' });
});

// 404 page // mini basic middleware
app.use((req, res) => { // these code should always be at the bottom
    res.status(404).render('404', { title: 'Home' });
});