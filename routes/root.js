const express = require('express');
const path = require('path');
const Post = require('../models/article');

const router = express.Router();

router
  .route('/')
  .get((req, res) => res.sendFile(path.resolve(__dirname, '/index.html')))

  .post((req, res) => {
    const article = new Post({
      title: req.body.articleTitle,
      body: req.body.articleBody,
    });

    article.save();

    res.redirect('/');
  });
