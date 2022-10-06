const { Router } = require("express");
const { urlCollection } = require("../");

const router = Router();

router.get('/:shortUrl*', async (req, res, next) => {
    const shortenedUrl = await urlCollection.findOne({
        shortUrl: req.params.shortUrl
    });

    if (!shortenedUrl) {
        return next();
    };

    req.shortenedUrl = shortenedUrl;

    next();
});

router.get('/:shortUrl', (req, res, next) => {
    if (!req.shortenedUrl) {
        return next();
    };

    res.redirect(req.shortenedUrl.destination);

    urlCollection.updateOne({
        shortUrl: req.shortenedUrl.shortUrl
    }, {
        $inc: { redirects: 1 }
    })
});

router.get('/:shortUrl/info', async (req, res, next) => {
    if (!req.shortenedUrl) {
        return next();
    };

    return res.render("info", { ...req.shortenedUrl });
});

module.exports = router;
