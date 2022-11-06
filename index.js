const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

// middlewares
app.use(cors());
app.use(express.json());

// MongoDB
const uri =
    'mongodb+srv://<username>:<password>@cluster0.onfc57d.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

app.get('/', (req, res) => {
    res.send({
        message: 'True Volunteer Server',
    });
});

app.listen(port, () => {
    console.log('Listening to port: ', port);
});
