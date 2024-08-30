const express = require('express');
const cors = require('cors');
const axios = require('axios'); //use axios for making HTTP requests
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();
const PORT = 3000;
// Enhanced connection options

app.use(cors()); // Enable CORS for all routes
//connect mongodb database for users
mongoose.connect("mongodb+srv://vanhacnguyen:Hc13076441!@cluster0.pslvadd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

// Set up Handlebars view engine with default layout
app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'default',
    layoutsDir: path.join(__dirname, 'views', 'layout')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const User = require('./data/userData'); 
const Book = require('./data/bookData');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse URL-encoded bodies (from form submissions)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

// Define the API endpoint to fetch user data
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch(error){
        res.status(500).send(error);
    }
});
app.get('/api/books', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch(error){
        res.status(500).send(error);
    }
});

app.get('/', (req, res) => {
    res.render('home', {css: 'home.css', js: 'home.js'});
});
app.get('/desc/works/:id', (req, res) => {
    res.render('desc', {css: 'desc.css', js: 'desc.js'})
});
app.get('/book', (req, res) => {
    res.render('book', {css: 'book.css', js: 'book.js'});
});
app.get('/register', (req, res) => {
    res.render('register', {css: 'register.css', js: 'register.js'});
});
app.get('/logIn', (req, res) => {
    res.render('logIn', {css: 'register.css', js: 'logIn.js'});
});
app.get('/bookshelf', (req, res) => {
    // res.render('bookshelf');
});
app.get('/api/desc/:id', async (req, res) => { // fetch from the Open Library API for the description of the book
    const bookId = req.params.id;
    try {
        const response = await axios.get(`https://openlibrary.org/works/${bookId}.json`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching book data:', error);
        res.status(500).send('Error fetching book data');
    }
});

//update the database by adding a book to the Bookshelf
app.post('/bookshelfData', async(req, res) =>{
    try{
        const { bookName, author } = req.body;
        // create a new favorite book entry
        let newFavorite = new Book({
            bookName: bookName,
            author: author
        });
        //save the book to database
        await newFavorite.save();

        res.status(201).send('Book added to favorites successfully');
    } catch (err){
        console.error('Error adding book to favorites: '+ err);
        res.status(500).send('Internal Server Error');
    }
});

//update the database by adding a new user
app.post('/register', async(req, res) => { 
    try {
        const existingUser = await User.findOne({ name: req.body.name });
        if(existingUser){
            return res.status(400).send('Username is already taken.')
        }

        let newUser = new User({
            name: req.body.name, // username is from the input name in the register page
            password: req.body.pass // password is from the input pass in the register page
        });
        newUser.save();
        res.redirect('/');
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).send('Internal Server Error');
    }
});
app.use((req,res) => {
    res.status(404).render('error', {css: 'error.css'});
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

