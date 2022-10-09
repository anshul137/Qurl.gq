const axios = require("axios");
const { Router } = require("express");
const { urlCollection } = require("../");

const router = Router();

router.get('/:shortUrl*', async (req, res, next) => {
    const shortenedUrl = await urlCollection.findOne({
        shortUrl: req.params.shortUrl
    });

    if (!shortenedUrl) {
        return res.redirect("/404");
    };

    req.shortenedUrl = shortenedUrl;
    next();
});

router.get('/:shortUrl', async (req, res, next) => {
    res.redirect(req.shortenedUrl.destination);

    const update = { $inc: { redirects: 1 } };
    
    // IP address logging
    if (req.shortenedUrl.logIps) {
        const ipAddress = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() ; 
        let location,coordinates;
        try {
            var response = await axios.get(`https://ipapi.co/${ipAddress}/json/`);
            location = `${response.data.city}, ${response.data.region}, ${response.data.country_name}`;
            coordinates = [response.data.longitude, response.data.latitude]
        } catch {};

        update["$push"] = { visitors: { ipAddress: response.data.ip, location, time: Date.now() ,coordinates} };
    }

    urlCollection.updateOne({ shortUrl: req.shortenedUrl.shortUrl }, update);
});

router.get('/:shortUrl/info', async (req, res, next) => {
    req.shortenedUrl.locationsLngLat = []
    req.shortenedUrl.visitors.forEach( (visit)=>{
        req.shortenedUrl.locationsLngLat.push({
            coordinates: visit.coordinates
        })
    })
    req.shortenedUrl.mapToken = process.env.MAP_TOKEN
    req.shortenedUrl.mapStyle = process.env.MAP_STYLE
    res.render("info", { ...req.shortenedUrl });
});

module.exports = router;
