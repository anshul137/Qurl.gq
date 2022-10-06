const { Router } = require("express");
const router = Router();

router.use(require("./shortUrl"));
router.use("/createUrl", require("./createUrl"));

router.get("/", (req, res) => {
    res.render("index");
});

router.use((req, res) => {
  res.render("404");
});

module.exports = router;