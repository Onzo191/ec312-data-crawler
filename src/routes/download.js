const express = require('express');
const downloadController = require("../controllers/download-controller");

const router = express();

router.route("/download").get(downloadController);

module.exports = router;