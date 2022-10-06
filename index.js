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
        process.exit(1)
    }
});

const urlCollection = client.db("prod").collection("urlCollection");

module.exports = { urlCollection }

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(require("./router"));

app.listen(8080, () => {
    console.log("Listening on port 8080\nhttp://localhost:8080");
});
