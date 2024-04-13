const express = require('express');
const crawlerController = require("../controllers/crawler-controller");

const router = express();

router.route("/crawler").post(crawlerController);

module.exports = router;