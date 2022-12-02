const db = require("../db");
const Book = require("../Book");
const bookSeed = async () => {
  await db.sync({ force: true });

  const [devilman1, adamStrange1, wonderWoman, silverSurfer, xmen] =
    await Promise.all([
      Book.create({
        title: "Devilman",
        author: "Nagai Go",
        description: "a really cool manga",
        genre: "action",
        volume: 1,
        yearOfPublish: 1972,
        imageURL: "/bookImages/devilman1.jpg",
        price: 10,
        stock: 5,
      }),
      Book.create({
        title: "Adam Strange",
        author: "Andy Diggle",
        description:
          "Things have changed drastically for Strange. Once the greatest hero of the distant planet Rann, he's now a wanted man on Earth. Pursued by the police and hunted by aliens, Strange has learned that his adopted planet has been destroyed. With his wife and daughter gone, is there any hope left, or is this the end of the space hero? Sit back for a thrilling ride that takes one man on a trek though the DC Universe to rediscover the remnants of the L.E.G.I.O.N., the Darkstars, the Omega Men and more, as he faces a threat that will herald a galactic war!",
        genre: "action",
        volume: 1,
        yearOfPublish: 2004,
        imageURL: "/bookImages/adamStrange.webp",
        price: 5,
        stock: 20,
      }),
      Book.create({
        title: "Wonder Woman #89",
        author: "Christopher Priest",
        description: "I couldn't find a description:D",
        genre: "action",
        volume: 2,
        yearOfPublish: 1994,
        imageURL: "/bookImages/wonderWoman.jpeg",
        price: 5,
        stock: 20,
      }),
      Book.create({
        title: "The Silver Surfer #16",
        author: "Stan Lee",
        description:
          "Mephisto has yet another plan to obtain the Silver Surfer's soul. He disguises himself and walks among the humans.",
        genre: "action",
        volume: 1,
        yearOfPublish: 1970,
        imageURL: "/bookImages/silverSurger.png",
        price: 20,
        stock: 5,
      }),
      Book.create({
        title: "The X-Men #141",
        author: "Chris Claremont",
        description:
          "Thirty-three years in the future, North America is controlled by Sentinels. The few surviving X-Men - Kitty Pryde, Storm, Colossus, Wolverine and Franklin Richards, son of Mr. Fantastic and Invisible Woman, along with Magneto, plan to change history by having Rachel Summers exchange the psyche of the adult Kate Pryde with that of her younger self.",
        genre: "action",
        volume: 1,
        yearOfPublish: 1981,
        imageURL: "/bookImages/xmen.jpeg",
        price: 20,
        stock: 5,
      }),
    ]);
  return {
    books: { devilman1 },
  };
};

module.exports = bookSeed;
