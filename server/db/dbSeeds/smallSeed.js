const { seed, User, Cart, Book, Review } = require("./db");

const smallSeed = async () => {
  // Clear out any old data
  await db.sync({ force: true });
  console.log("STARTING SMALL SEED...");

  // seeds 2 users
  const [moe, lucy] = await Promise.all([
    User.create({
      username: "moe",
      password: "123",
      firstName: "Moe",
      lastName: "Jones",
      email: "moejones99@email.com",
    }),
    User.create({
      username: "lucy",
      password: "123",
      firstName: "Lucy",
      lastName: "Smith",
      email: "lucysmith100@email.com",
    }),
  ]);

  // seeds 5 books
};

smallSeed();
