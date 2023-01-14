//importing express for link routers
const express = require("express");
const router = express.Router();

router.get("/post", (req, res) => {
  res.send("post");
});

module.exports = router;
