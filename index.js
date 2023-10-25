// import
const express = require('express');
const port = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => {
    res.send(`vounteer-network-server is listening to port: ${port}`);
})

// port listening
app.listen(port, () => {
    console.log("vounteer-network-server is listening to port: ", port);
});