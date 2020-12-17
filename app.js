/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');
const path = require('path');
require('dotenv').config();

const app = express();
const typeDefs = gql`
    type Query {
        test: String!
    }
`;
const resolvers = {
    Query: { test: () => 'test is done' },
};
const server = new ApolloServer({ typeDefs, resolvers });

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
server.applyMiddleware({ app });

const postSchema = new mongoose.Schema({
    title: String,
    body: String,
});
const Post = mongoose.model('Post', postSchema);

app.route('/')
    .get((req, res) => res.sendFile(path.resolve(__dirname, '/index.html')))

    .post((req, res) => {
        const post = new Post({
            title: req.body.articleTitle,
            body: req.body.articleBody,
        });

        post.save();
        res.redirect('/');
    });
// eslint-disable-next-line array-callback-return
Post.find((err, posts) => posts.forEach((post) => console.log(post.title)));

mongoose
    .connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('mongodb connected');

        app.listen(process.env.PORT, () =>
            console.log(`http://localhost:3000${server.graphqlPath}`)
        );
    });
