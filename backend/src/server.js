const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const server = express();

mongoose.connect('mongodb+srv://root:UnXuPq7Yllj9HZPp@cluster0-4by1w.mongodb.net/tindev?retryWrites=true&w=majority',  {
    useNewUrlParser: true
});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);
