const { User, db, Book, Review, CartItem } = require("./");
const bookSeed = require("./dbSeeds/bookSeed");
const cartSeed = require("./dbSeeds/cartSeed");
const dummyBookSeed = require("./dbSeeds/dummyBookSeed");

const seed = async () => {
  console.log("BEGINNING SEEDING...");

  await db.sync({ force: true });

  // small bookSeed
  const { books } = await bookSeed();

  // large book seed
  // const {books} = await dummyBookSeed();

  await bookSeed();
  // await dummyBookSeed();
  const [moe, lucy, larry, ethyl] = await Promise.all([
    User.create({
      username: "moe",
      password: "123",
      firstName: "Moe",
      lastName: "Jones",
      email: "moejones99@email.com",
      birthday: "1990-03-20",
      phoneNumber: "9785477082",
      address: "1000 Pine Street",
      creditCard: 4846540980335660,
    }),
    User.create({
      username: "lucy",
      password: "123",
      firstName: "Lucy",
      lastName: "Smith",
      email: "lucysmith100@email.com",
      birthday: "1990-12-25",
      phoneNumber: "9785478000",
      address: "95 Grace Way",
      creditCard: 346251528305693,
    }),
    User.create({
      username: "larry",
      password: "123",
      firstName: "Larry",
      lastName: "Johnson",
      email: "larryjohnson@email.com",
      birthday: "2001-01-05",
      phoneNumber: "9785446445",
      address: "200 Hopper Ave",
      creditCard: 6011246417965285,
    }),
    User.create({
      username: "ethyl",
      password: "123",
      firstName: "Ethyl",
      lastName: "Thompson",
      email: "ethylthompson22@email.com",
      birthday: "1995-04-12",
      phoneNumber: "9785474422",
      address: "22 West Way",
      creditCard: 5217487872137994,
    }),
  ]);

  const users = { moe, lucy, larry, ethyl };

  // Pass our book and user objects into our cart and review seed functions.
  await cartSeed(books, users);

  console.log("...FINISHED SEEDING.");

  return {
    users: {
      moe,
      lucy,
      larry,
      ethyl,
    },
  };
};

module.exports = seed;
