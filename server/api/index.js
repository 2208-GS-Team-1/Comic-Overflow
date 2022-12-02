const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/comics", require("./comics"));
module.exports = router;
