const { Router } = require("express");
const { urlCollection } = require("../");
const { isValidHttpUrl } = require("../utils");

const router = Router();

router.post("/", (req, res, next) => {
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

router.post("/", async (req, res, next) => {
    const shortUrl = await urlCollection.findOne({
        destination: req.body.url
    });

    if (shortUrl) {
        return res.json({ shortUrl: shortUrl.shortUrl });
    }

    next();
});

router.post("/", async (req, res) => {

    const chooseUrl = async () => {
        const shortUrl = Math.random().toString(36).substring(2, 7);

        if (await urlCollection.findOne({ shortUrl: shortUrl })) {
            chooseUrl(); // prevent duplicates
        }

        await urlCollection.insertOne({
            shortUrl,
            destination: req.body.url,
            redirects: 0,
            ips: []
        });

        return shortUrl
    }

    const url = await chooseUrl();

    return res.json({ shortUrl: url });
});

module.exports = router;
