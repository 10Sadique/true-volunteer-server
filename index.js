const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const database = client.db('volunteerNetwork');
    const eventsCollection = database.collection('volunteerEvents');
    const volunteerCollection = database.collection('activeVolunteers');

    // activities
    app.get('/activities', async (req, res) => {
        let query = {};
        if (req.query.email) {
            query = {
                email: req.query.email,
            };
        }

        const cursor = volunteerCollection.find(query);
        const events = await cursor.toArray();

        res.send(events);
    });

    app.post('/activities', async (req, res) => {
        const user = req.body;
        const result = await volunteerCollection.insertOne(user);

        res.send(result);
    });

    app.delete('/activities/:id', async (req, res) => {
        const id = req.params.id;
        console.log(id);
        const query = { _id: ObjectId(id) };
        const result = await volunteerCollection.deleteOne(query);

        res.send(result);
    });

    // events
    app.get('/events', async (req, res) => {
        const query = {};
        const cursor = eventsCollection.find(query);
        const events = await cursor.toArray();

        res.send(events);
    });

    app.get('/events/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const event = await eventsCollection.findOne(query);

        res.send(event);
    });
}

run().catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.send({
        message: 'True Volunteer Server',
    });
});

app.listen(port, () => {
    console.log('Listening to port: ', port);
});
