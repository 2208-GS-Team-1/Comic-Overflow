const db = require("../db");
const Book = require("../Book");
const dummyData = require("./dummyBooks.json");
const dummyBookSeed = async () => {
  await db.sync({ force: true });
  await Promise.all(dummyData.map((dummyBook) => Book.create(dummyBook)));
  console.log("Dummy books successfully seeded!");
};

module.exports = dummyBookSeed;
