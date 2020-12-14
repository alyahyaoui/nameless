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
const posts = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
server.applyMiddleware({ app });
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
