/* eslint-disable no-unused-vars */
const { RoomService } = require("@mui/icons-material");
const { db, User, Book, Review, CartItem } = require("../");

const reviewSeed = async (books, users) => {
  //console.log(`Magic methods are in here: ${Object.keys(Review.prototype)}`);
  console.log("SEEDING REVIEWS...");

  // Destruct users out of users object
  const { moe, lucy, larry, ethyl } = users;

  // Destruct books out of book object
  const { devilman1, adamStrange1, wonderWoman, silverSurfer, xmen } = books;

  // Below are various ways of creating reviews & their associations:

  //*********************** Moe has reviewed devilman volume 1 ************************//

  // Creating first review for Moe
  const moesFirstReview = await Review.create({
    subject: "Worst Comic Ever",
    content:
      "This comic stinks! If I could give it a 0/5 stars, I would. AVOID!",
    rating: 1,
  });

  //*********************** Moe has reviewed woman volume 2 ************************//

  // Creating second review for Moe
  const moesSecondReview = await Review.create({
    subject: "Sweet!",
    content: "Wonder Woman is the best! She could kick Superman's a**.",
    rating: 5,
  });

  //*********************** Lucy has reviewed wonder woman ************************//

  //Creating first view for Lucy
  const lucysFirstReview = await Review.create({
    subject: "Meh",
    content:
      "This was ok, but not as good as Devilman! Go buy Devilman if you really want to be entertained",
    rating: 4,
  });

  // Using some magic methods to make associations
  await moe.addReview(moesFirstReview);
  await moe.addReview(moesSecondReview);
  await lucy.addReview(lucysFirstReview);
  await devilman1.addReview(moesFirstReview);
  await wonderWoman.addReview(moesSecondReview);
  await wonderWoman.addReview(lucysFirstReview);

  // Rose is reviewing some stuff.
  await Promise.all([
    Review.create({
      subject: "Good",
      content: `Paper was thin.`,
      rating: 4,
      userId: users.rose.id,
      bookId: books.berserk1.id,
    }),
    Review.create({
      subject: "AMAZING!!",
      content: `Huge berserk fan. It's amazing to see the art in such a large format.`,
      rating: 5,
      userId: users.rose.id,
      bookId: books.berserkDeluxe1.id,
    }),
    Review.create({
      subject: "Great book... HORRIBLE packaging.",
      content: `I wish I could review this book better, but it's so torn up from shipment I can't even read it. 0 stars!`,
      rating: 1,
      userId: users.rose.id,
      bookId: books.berserkDeluxe2.id,
    }),
    Review.create({
      subject: "Legendary.",
      content: `What an end to the series.. no spoilers.`,
      rating: 5,
      userId: users.rose.id,
      bookId: books.akagi36.id,
    }),
    Review.create({
      subject: "Not a fan of the translation",
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      rating: 3,
      userId: users.rose.id,
      bookId: books.kaiji1.id,
    }),
    Review.create({
      subject: "still not a fan of the translation",
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      rating: 3,
      userId: users.rose.id,
      bookId: books.kaiji2.id,
    }),
  ]);

  // Now to test if our MOE entries are right, by requerying for them with joining.
  let testReview = await Review.findByPk(moesFirstReview.id, {
    include: [User, Book],
  });

  console.log(`Review ${testReview.id} was submitted by ${testReview.user.username},
  and the book is ${testReview.book.title}
  subject is ${testReview.subject}
  the review is ${testReview.content} with ${testReview.rating} stars\n`);

  testReview = await Review.findByPk(moesSecondReview.id, {
    include: [User, Book],
  });
  console.log(`Review ${testReview.id} was submitted by ${testReview.user.username},
  and the book is ${testReview.book.title}
  subject is ${testReview.subject}
  the review is ${testReview.content} with ${testReview.rating} stars\n`);

  console.log("... DONE SEEDING REVIEWS");

  return;
};

module.exports = reviewSeed;
