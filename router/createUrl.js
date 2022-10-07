const { Router } = require("express");
const { urlCollection } = require("../");
const { isValidHttpUrl, generateShortUrl } = require("../utils");

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


    console.log(typeof req.body.logIps)
    if (typeof req.body.logIps !== "boolean"){
        res.status(400);
        return res.json({
            "errors": [
                "You must choose whether to log IP addresses or not."
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

router.post("/", async (req, res) => {
    const shortUrl = await generateShortUrl();

    await urlCollection.insertOne({
        shortUrl,
        destination: req.body.url,
        redirects: 0,
        logIps: req.body.logIps,
        visitors: []
    });

    return res.json({ shortUrl });
});

module.exports = router;
