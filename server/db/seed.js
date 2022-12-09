const { User, db } = require("./");
const bookSeed = require("./dbSeeds/bookSeed");
const cartSeed = require("./dbSeeds/cartSeed");
const reviewSeed = require("./dbSeeds/reviewSeed");

const seed = async () => {
  console.log("BEGINNING SEEDING...");

  await db.sync({ force: true });

  // small bookSeed
  const { books } = await bookSeed();

  // large book seed
  // const {books} = await dummyBookSeed();

  // await dummyBookSeed();
  const [moe, lucy, larry, ethyl, admin, rose] = await Promise.all([
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
      imageUrl: "/static/userImages/moe.jpg",
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
      imageUrl: "/static/userImages/lucy.jpg",
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
      imageUrl: "/static/userImages/larry.jpg",
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
      imageUrl: "/static/userImages/ethyl.jpg",
    }),

    // ADMIN USERS
    User.create({
      username: "admin",
      password: "admin",
      isAdmin: true,
      firstName: "admin",
      lastName: "admin",
      email: "admin@admin.com",
      imageUrl: "http://placehold.jp/200x200.png",
    }),
    User.create({
      username: "rosalie0",
      password: "123",
      isAdmin: true,
      firstName: "Rosalie",
      lastName: "Newman",
      email: "rosalienewman0@gmail.com",
      imageUrl: "/static/userImages/rose.jpg",
    }),
  ]);

  const users = { moe, lucy, larry, ethyl, admin, rose };

  // Pass our book and user objects into our cart and review seed functions.
  await cartSeed(books, users);
  await reviewSeed(books, users);
  console.log("...FINISHED SEEDING.");

  return {
    users: {
      moe,
      lucy,
      larry,
      ethyl,
      admin,
      rose,
    },
  };
};

seed();
