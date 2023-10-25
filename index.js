// import
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;

const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`vounteer-network-server is listening to port: ${port}`);
})

// port listening
app.listen(port, () => {
    console.log("vounteer-network-server is listening to port: ", port);
});