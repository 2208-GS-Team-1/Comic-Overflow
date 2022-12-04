const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/books", require("./books"));
router.use("/users", require("./users"));
router.use("/reviews", require("./reviews"));

module.exports = router;
