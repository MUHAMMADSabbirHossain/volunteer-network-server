// import
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

// mongodb atlas
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gyfliot.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");


        const volunteerCollection = client.db("volunteerNetwork").collection("volunteer");

        // get
        app.get("/volunteers", async (req, res) => {
            const query = {};
            const cursor = volunteerCollection.find(query);
            const volunteers = await cursor.toArray();
            console.log(volunteers);
            res.send(volunteers);
        });

        // post
        app.post("/volunteers", async (req, res) => {
            const newVolunteer = req.body;
            console.log(newVolunteer);
            const result = await volunteerCollection.insertOne(newVolunteer);
            res.send(result);
        });



    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


//server home page
app.get('/', (req, res) => {
    res.send(`vounteer-network-server is listening to port: ${port}`);
});

// port listening
app.listen(port, () => {
    console.log("vounteer-network-server is listening to port: ", port);
});