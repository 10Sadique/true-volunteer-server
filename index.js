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
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.onfc57d.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

async function run() {
    const eventsCollection = client
        .db('volunteerNetwork')
        .collection('volunteerEvents');

    // events
    app.get('/events', async (req, res) => {
        const query = {};
        const cursor = eventsCollection.find(query);
        const events = await cursor.toArray();

        res.send(events);
    });
}

run().catch((err) => console.dir);

app.get('/', (req, res) => {
    res.send({
        message: 'True Volunteer Server',
    });
});

app.listen(port, () => {
    console.log('Listening to port: ', port);
});
