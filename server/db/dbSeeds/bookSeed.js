const db = require("../db");
const Book = require("../Book");
const bookSeed = async () => {
  const dummyBooks = [
    {
      title: "Competition, The",
      author: "Ber Mathivon",
      volume: 72,
      description:
        "Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
      imageURL: "http://dummyimage.com/400x400.png/dddddd/000000",
      genre: "Drama|Romance",
      isbn: "440383141-9",
      edition: "Limited",
      price: 5386,
      stock: 24,
    },
    {
      title: "Thirst for Love, The (Ai no kawaki)",
      author: "Adi Sly",
      volume: 89,
      description:
        "Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum.",
      imageURL: "http://dummyimage.com/400x400.png/cc0000/ffffff",
      genre: "Drama",
      isbn: "481130207-9",
      edition: "Standard",
      price: 7183,
      stock: 55,
    },
    {
      title: "Hollywood or Bust",
      author: "Nappie Dever",
      volume: 49,
      description: "Quisque id justo sit amet sapien dignissim vestibulum.",
      imageURL: "http://dummyimage.com/400x400.png/ff4444/ffffff",
      genre: "Comedy|Musical",
      isbn: "593580065-9",
      edition: "First Edition",
      price: 7693,
      stock: 8,
    },
    {
      title: "Leprechaun",
      author: "Lynde Greenier",
      volume: 24,
      description: "Proin at turpis a pede posuere nonummy.",
      imageURL: "http://dummyimage.com/400x400.png/dddddd/000000",
      genre: "Comedy|Horror",
      isbn: "927181193-3",
      edition: "Limited",
      price: 2240,
      stock: 62,
    },
    {
      title: "Drive-In Horrorshow",
      author: "Benjy Wasbey",
      volume: 78,
      description: "Nulla ut erat id mauris vulputate elementum.",
      imageURL: "http://dummyimage.com/400x400.png/dddddd/000000",
      genre: "Horror",
      isbn: "462357162-9",
      edition: "Standard",
      price: 6683,
      stock: 35,
    },
    {
      title: "Mr. Nice",
      author: "Rosa Aleswell",
      volume: 26,
      description: "Duis aliquam convallis nunc.",
      imageURL: "http://dummyimage.com/400x400.png/cc0000/ffffff",
      genre: "Comedy|Drama",
      isbn: "635532172-1",
      edition: "Limited",
      price: 8450,
      stock: 96,
    },
  ];
  const [devilman1, adamStrange1, wonderWoman, silverSurfer, xmen] =
    await Promise.all([
      Book.create({
        title: "Devilman",
        author: "Nagai Go",
        description: "a really cool manga",
        genre: "action",
        volume: 1,
        yearOfPublish: 1972,
        imageURL: "/static/bookImages/devilman1.jpg",
        price: 1000,
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
        imageURL: "/static/bookImages/adamStrange.webp",
        price: 500,
        stock: 20,
      }),
      Book.create({
        title: "Wonder Woman",
        author: "Christopher Priest",
        description: "I couldn't find a description:D",
        genre: "action",
        volume: 89,
        yearOfPublish: 1994,
        imageURL: "/static/bookImages/wonderWoman.jpeg",
        price: 500,
        stock: 20,
      }),
      Book.create({
        title: "The Silver Surfer",
        author: "Stan Lee",
        description:
          "Mephisto has yet another plan to obtain the Silver Surfer's soul. He disguises himself and walks among the humans.",
        genre: "action",
        volume: 16,
        yearOfPublish: 1970,
        imageURL: "/static/bookImages/silverSurfer.png",
        price: 2000,
        stock: 5,
      }),
      Book.create({
        title: "The X-Men",
        author: "Chris Claremont",
        description:
          "Thirty-three years in the future, North America is controlled by Sentinels. The few surviving X-Men - Kitty Pryde, Storm, Colossus, Wolverine and Franklin Richards, son of Mr. Fantastic and Invisible Woman, along with Magneto, plan to change history by having Rachel Summers exchange the psyche of the adult Kate Pryde with that of her younger self.",
        genre: "action",
        volume: 141,
        yearOfPublish: 1981,
        imageURL: "/static/bookImages/xmen.jpeg",
        price: 2000,
        stock: 5,
      }),
    ]);
  const dummySeeds = await Promise.all(
    dummyBooks.map((index) => Book.create(index))
  );
  return {
    books: { devilman1, adamStrange1, wonderWoman, silverSurfer, xmen },
    dummySeeds,
  };
};

module.exports = bookSeed;
