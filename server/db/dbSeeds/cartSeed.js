const { db, User, Book, Review, CartItem } = require("../");

const cartSeed = async (books, users) => {
  //console.log(`Magic methods are in here: ${Object.keys(CartItem.prototype)}`);

  // Destruct users out of users object
  const { moe, lucy, larry, ethyl, rose } = users;

  // Destruct books out of book object
  const { devilman1, adamStrange1, wonderWoman, silverSurfer, xmen } = books;

  // Below are various ways of creating cart items & their associations:

  //*********************** MOE CART SEEDING ************************//

  // Moe has devilman volume 1 in his cart
  // Creating the instance with explicitly giving it the ids:
  const moesFirstCartItem = await CartItem.create({
    userId: moe.id,
    bookId: devilman1.id,
  });

  // Moe has wonder woman volume 89 in his cart
  // This creates the cartitem instance with no associations yet:
  const moesSecondCartItem = await CartItem.create({});

  // Using some magic methods to make associations
  await moe.addCartItem(moesSecondCartItem);
  await wonderWoman.addCartItem(moesSecondCartItem);

  // Now to test if our MOE entries are right, by requerying for them with joining.
  let testCartItem = await CartItem.findByPk(1, {
    include: [User, Book],
  });
  console.log(`Cart item ${testCartItem.id} is in ${testCartItem.user.username}'s cart,
  its checked out status is: ${testCartItem.isCheckedOut}
  and the book is ${testCartItem.book.title} volume ${testCartItem.book.volume}\n`);

  testCartItem = await CartItem.findByPk(2, {
    include: [User, Book],
  });
  console.log(`Cart item ${testCartItem.id} is in ${testCartItem.user.username}'s cart,
  its checked out status is: ${testCartItem.isCheckedOut}
  and the book is ${testCartItem.book.title} volume ${testCartItem.book.volume}\n`);

  //*********************** LUCY CART SEEDING ************************//

  // Lucy has already purchased Wonder Woman vol.89
  // Let's say when lucy bought this, it was at a different price than what we currently charge,
  // to test this feature.
  const lucyFirstCartItem = await CartItem.create({
    userId: lucy.id,
    bookId: wonderWoman.id,
    isCheckedOut: true,
    priceAtCheckOut: wonderWoman.price + 500, // plus 5 dollars
    orderStatus: "delivered",
    timeOfCheckOut: new Date(),
  });

  // Lucy has Adam Strange in her cart.
  const lucySecondCartItem = await CartItem.create({
    userId: lucy.id,
    bookId: adamStrange1.id,
  });

  // Lucy has Wonder Woman in her cart (she wants another copy)
  const lucyThirdCartItem = await CartItem.create({
    userId: lucy.id,
    bookId: wonderWoman.id,
  });

  const boughtWW = await CartItem.findByPk(lucyFirstCartItem.id, {
    include: [User, Book],
  });
  const inCartWW = await CartItem.findByPk(lucyThirdCartItem.id, {
    include: [User, Book],
  });

  console.log(
    `${boughtWW.user.firstName} previously purchased ${boughtWW.book.title} vol.${boughtWW.book.volume} for ${boughtWW.priceAtCheckOut}. 
    Its checkout status is ${boughtWW.isCheckedOut} and orderStatus is ${boughtWW.orderStatus}.
    She bought it at: ${boughtWW.timeOfCheckOut}
    But she wants to buy it again, and the price we are selling it for now
    is: ${wonderWoman.price}, therefore the item in her cart is: ${inCartWW.book.price}.`
  );

  //*********************** LARRY'S CART SEEDING ************************//
  // Larry's Cart is:
  // Berserk vol.1,         quatity: 1
  // Berserk vol.2,         quatity: 2
  //           (quantity handled by just making 2 cart items, quantity calculated on front end)
  // Berserk vol.1 DELUXE edition, quatity: 1
  await Promise.all([
    CartItem.create({
      userId: larry.id,
      bookId: books.berserk1.id,
    }),
    CartItem.create({
      userId: larry.id,
      bookId: books.berserk2.id,
    }),
    CartItem.create({
      userId: larry.id,
      bookId: books.berserk2.id,
    }),
    CartItem.create({
      userId: larry.id,
      bookId: books.berserkDeluxe1.id,
    }),
  ]);

  //*********************** ETHYL'S CART SEEDING ************************//
  // Ethyl has Akagi vol 36 in her cart, which is actually out of stock.
  // This is valid, we will have to decide when to remove it from a user's cart
  // EG if they try to check out,
  // remove it first (front-end calls DELETE /api/cart/:cartItem)
  await CartItem.create({
    userId: ethyl.id,
    bookId: books.akagi36.id,
  });

  //*********************** ROSE'S CART SEEDING ************************//
  // Active Cart is empty

  return;
};

module.exports = cartSeed;
