/* eslint-disable no-console */

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const root = require('./routes/root');
const Post = require('./models/article');
require('dotenv').config();

const app = express();
const db = mongoose.connection;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', root);
app.set('view engine', 'ejs');

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('connected to mongodb'));

app.listen(process.env.PORT, () => console.log(`http://localhost:3000`));

// Post.find((err, posts) => posts.forEach((post) => console.log(post.title)))
