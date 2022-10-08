const { Router } = require("express");
const router = Router();

router.use(require("./shortUrl"));
router.use("/createUrl", require("./createUrl"));

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/404", (req, res) => {
  res.status(404);

  if (req.accepts('html')) {
    res.render("404");
  }

  else if (req.accepts('json')) {
    res.json({ error: 'Not found' });
  }

  else {
    res.type('txt').send('Not found');
  }
});

router.use((req, res) => {
  res.redirect("/404");
});

module.exports = router;
