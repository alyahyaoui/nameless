/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');

const app = express();
const posts = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
/**
 * sending the index.html file when getting request from the root route
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});
/**
 * creating an object based upon the values returned from the compose inputs
 *  and adding it to the "posts" array"
 */
app.post('/', (req, res) => {
    const post = {
        title: req.body.articleTitle,
        body: req.body.articleBody,
    };
    posts.push(post);
    console.log(posts);
    res.redirect('/');
});

app.listen(3000, () => console.log('Running on http://localhost:3000'));
