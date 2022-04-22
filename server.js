const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.send("<h1>Hola</h1>")
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening on port ${process.env.SERVER_PORT}`)
});
