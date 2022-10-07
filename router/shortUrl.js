const axios = require("axios");
const { Router } = require("express");
const { urlCollection } = require("../");

const router = Router();

router.get('/:shortUrl*', async (req, res, next) => {
    const shortenedUrl = await urlCollection.findOne({
        shortUrl: req.params.shortUrl
    });

    if (!shortenedUrl) {
        return next(); // 404
    };

    req.shortenedUrl = shortenedUrl;

    next();
});

router.get('/:shortUrl', async (req, res, next) => {
    if (!req.shortenedUrl) {
        return next(); // 404
    };

    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    let location;

    try {
        const response = await axios.get(`https://ipapi.co/${ip}/json/`);
        location = `${response.data.city}, ${response.data.region}, ${response.data.country_name}`;
    } catch {}

    res.redirect(req.shortenedUrl.destination);

    urlCollection.updateOne({
        shortUrl: req.shortenedUrl.shortUrl
    }, {
        $inc: { redirects: 1 },
        $push: { visitors: { ip, location, time: Date.now() } }
    })
});

router.get('/:shortUrl/info', async (req, res, next) => {
    if (!req.shortenedUrl) {
        return next(); // 404
    };

    return res.render("info", { ...req.shortenedUrl });
});

module.exports = router;
