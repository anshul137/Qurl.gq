if (process.env["DEV"]) {
    require("dotenv").config();
}

const express = require("express");
const { isValidHttpUrl } = require("./utils");
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

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index");
});

app.get('/:shortUrl*', async (req, res, next) => {
    const shortenedUrl = await urlCollection.findOne({
        shortUrl: req.params.shortUrl
    });

    if (!shortenedUrl) {
        return res.redirect("/")
    };

    req.shortenedUrl = shortenedUrl;

    next();
});

app.get('/:shortUrl', (req, res) => {
    res.redirect(req.shortenedUrl.destination);

    urlCollection.updateOne({
        shortUrl: req.shortenedUrl.shortUrl
    }, {
        $inc: { redirects: 1 }
    })
});

app.get('/:shortUrl/info', async (req, res) => {
    return res.render("info", { ...req.shortenedUrl });
});

app.post("/createUrl", (req, res, next) => {
    if (!req.body.url) {
        res.status(400);
        return res.json({
            "errors": [
                "Missing 'url' field in JSON body"
            ]
        })
    }

    if (!isValidHttpUrl(req.body.url)) {
        res.status(400);
        return res.json({
            "errors": [
                "Invalid URL."
            ]
        })
    }

    next();
});

app.post("/createUrl", async (req, res, next) => {
    const shortUrl = await urlCollection.findOne({
        destination: req.body.url
    });

    if (shortUrl) {
        return res.json({ shortUrl: shortUrl.shortUrl });
    }

    next();
});

app.post("/createUrl", async (req, res) => {
    const shortUrl = Math.random().toString(36).substr(2, 5);

    await urlCollection.insertOne({
        shortUrl,
        destination: req.body.url,
        redirects: 0
    });

    return res.json({ shortUrl });
});

app.listen(8080, () => {
    console.log("Listening on port 8080\nhttp://localhost:8080");
});
