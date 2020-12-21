const { Schema, model } = require('mongoose');

const postSchema = new Schema({
  title: String,
  body: String,
});

module.exports = model('post', postSchema);
