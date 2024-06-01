const express = require('express');
const app = express();
const mongoose = require('mongoose');

const PORT = 3000;
// Enhanced connection options

//connect mongodb database for users
mongoose.connect("mongodb+srv://vanhacnguyen:Hc13076441%21@cluster0.pslvadd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");


const User = require('./data/userData'); 

app.use(express.static('public'));
// Middleware to parse URL-encoded bodies (from form submissions)
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/home.html');
});
app.get('/about.html', (req, res) => {
    res.sendFile(__dirname + '/views/about.html');
});
app.get('/book.html', (req, res) => {
    res.sendFile(__dirname + '/views/book.html')
});
app.get('/register.html', (req, res) => {
    res.sendFile(__dirname + '/views/register.html')
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
app.use((req,res,next) => {
    res.status(404).sendFile(__dirname + '/views/error.html');
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

