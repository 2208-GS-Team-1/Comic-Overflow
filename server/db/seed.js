const db = require("./db");
const User = require("./User");

const seed = async () => {
  await db.sync({ force: true });

  const [moe, lucy, larry, ethyl] = await Promise.all([
    User.create({
      username: "moe",
      password: "123",
      firstName: "Moe",
      lastName: "Jones",
      email: "moejones99@email.com",
      birthday: "1990-03-20",
      phoneNumber: 9785477082,
      address: "1000 Pine Street",
      creditCard: 1234123412341234,
    }),
    User.create({
      username: "lucy",
      password: "123",
      firstName: "Lucy",
      lastName: "Smith",
      email: "lucysmith100@email.com",
      birthday: "1990-12-25",
      phoneNumber: 978547800,
      address: "95 Grace Way",
      creditCard: 1235123512351235,
    }),
    User.create({
      username: "larry",
      password: "123",
      firstName: "Larry",
      lastName: "Johnson",
      email: "larryjohnson@email.com",
      birthday: "2001-01-05",
      phoneNumber: 9785446445,
      address: "200 Hopper Ave",
      creditCard: 2234223422342234,
    }),
    User.create({
      username: "ethyl",
      password: "123",
      firstName: "Ethyl",
      lastName: "Thompson",
      email: "ethylthompson22@email.com",
      birthday: "1995-04-12",
      phoneNumber: 9785474422,
      address: "22 West Way",
      creditCard: 1254125412541254,
    }),
  ]);

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
