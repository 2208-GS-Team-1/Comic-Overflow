const express = require("express");
const router = require("./users");
const { User, CartItem, Book } = require("../db");

// api/orders/4

// gets back ALL orders of given userId
// GET api/orders/
// router.get("/:userId", async (req, res, next) => {});

router.get("/:username", async (req, res, next) => {
  username = req.params.username;
});

// gets a single order by an orderId
// GET
router.get("/username /:orderId", async (req, res, next) => {
  //
});
