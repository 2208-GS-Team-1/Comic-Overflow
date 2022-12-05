const { db, User, Book, Review, CartItem } = require("../");

const reviewSeed = async (books, users) => {
  //console.log(`Magic methods are in here: ${Object.keys(Review.prototype)}`);

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

  //Creating first reivew for Lucy
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

  return;
};

module.exports = reviewSeed;
