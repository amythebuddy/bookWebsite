const express = require('express');
const app = express();
const mongoose = require('mongoose');
const exphbs = require('handlebars');
const path = require('path');
const PORT = 3000;
// Enhanced connection options

//connect mongodb database for users
mongoose.connect("mongodb+srv://vanhacnguyen:Hc13076441%21@cluster0.pslvadd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

//Set up handlbars engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const User = require('./data/userData'); 

app.use(express.static('public'));
// Middleware to parse URL-encoded bodies (from form submissions)
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, views,) + '/views/home.html');
});
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, views,) + '/views/about.html');
});
app.get('/book', (req, res) => {
    res.sendFile(path.join(__dirname, views,) + '/views/book.html')
});
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, views,) + '/views/register.html')
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
    res.status(404).sendFile(path.join(__dirname, views,) + '/views/error.html');
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

