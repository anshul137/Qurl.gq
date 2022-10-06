if (process.env["DEV"]) {
    require("dotenv").config();
}

const express = require("express");
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env["MONGO_URI"], { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    if (!err) {
        console.log("Connected to MongoDB")
    } else {
        console.log(err)
    }
});

const urlCollection = client.db("prod").collection("urlCollection");

module.exports = { urlCollection }

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(require("./router"));

const WEB_URL = process.env.WEB_URL || "localhost";
const PORT = process.env.PORT || 3000;

app.listen(PORT, WEB_URL, () => {
    console.log(`Listening on port ${PORT}\nhttp://${WEB_URL}:${PORT}`);
});
