const { Router } = require("express");
const { urlCollection } = require("../");
const { isValidHttpUrl, generateUrl } = require("../utils");

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
    const url = await generateUrl(req.body.url);

    return res.json({ shortUrl: url });
});

module.exports = router;
