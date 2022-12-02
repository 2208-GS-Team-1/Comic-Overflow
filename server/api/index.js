const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/books", require("./books"));
module.exports = router;
