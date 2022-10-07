const { urlCollection } = require("../");

const isValidHttpUrl = (string) => {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

const generateUrl = async (destination) => {
    const shortUrl = Math.random().toString(36).substring(2, 7);

    if (await urlCollection.findOne({ shortUrl: shortUrl })) {
        return generateUrl(destination); // prevent duplicates
    }

    await urlCollection.insertOne({
        shortUrl,
        destination: destination,
        redirects: 0,
        ips: []
    });

    return shortUrl
}

module.exports = { isValidHttpUrl, generateUrl }
