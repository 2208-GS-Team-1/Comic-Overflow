const { db, User, Book, Review, CartItem, Order } = require("../");

const cartSeed = async (books, users) => {
  console.log("SEEDING CARTITEMS...");

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
  // console.log(`Cart item ${testCartItem.id} is in ${testCartItem.user.username}'s cart,
  // and the book is ${testCartItem.book.title} volume ${testCartItem.book.volume}\n`);

  testCartItem = await CartItem.findByPk(2, {
    include: [User, Book],
  });
  // console.log(`Cart item ${testCartItem.id} is in ${testCartItem.user.username}'s cart,
  // and the book is ${testCartItem.book.title} volume ${testCartItem.book.volume}\n`);

  //*********************** LUCY CART SEEDING ************************//

  // Lucy has already purchased Wonder Woman vol.89
  // Let's say when lucy bought this, it was at a different price than what we currently charge,
  // to test this feature.
  const lucyFirstOrder = await Order.create({
    userId: lucy.id,
    orderStatus: "delivered",
    timeOfCheckOut: new Date(),
    price: wonderWoman.price + 500, // plus 5 dollars
  });

  const lucyFirstCartItem = await CartItem.create({
    userId: lucy.id,
    bookId: wonderWoman.id,
    quantity: 1,
    priceTimesQuantityAtCheckOut: wonderWoman.price + 500, // plus 5 dollars
    orderId: lucyFirstOrder.id,
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

  //*********************** LARRY'S CART SEEDING ************************//
  // Larry's Cart is:
  // Berserk vol.1,         quantity: 1
  // Berserk vol.2,         quantity: 2
  // Berserk vol.1 DELUXE edition, quantity: 1
  await Promise.all([
    CartItem.create({
      userId: larry.id,
      bookId: books.berserk1.id,
    }),
    CartItem.create({
      userId: larry.id,
      bookId: books.berserk2.id,
      quantity: 2,
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

  //*********************** ROSE'S PREVIOUS PURCHASES SEEDING ************************//
  // all of these are unused for now!!
  // From w3schools ---> new Date(year,month,day,hours,minutes,seconds)
  const rosesFirstOrderDate = new Date(2008, 6, 15, 15, 0); // June 15, 2008 3pm
  const rosesSecondOrderDate = new Date(2020, 8, 1, 7, 33); // Aug 1, 2020 7:33am

  // Rose's first order in 2008 was...
  // Adam Strange vol.1 - quantity 2
  // Xmen vol.141 - quantity 3
  // Wonder Woman vol 89 - quantity 57
  const rosesFirstOrderPrice =
    adamStrange1.price * 2 + xmen.price * 3 + wonderWoman.price * 57;

  const rosesFirstOrder = await Order.create({
    userId: rose.id,
    orderStatus: "delivered",
    timeOfCheckOut: rosesFirstOrderDate,
    price: rosesFirstOrderPrice,
  });
  await CartItem.create({
    userId: rose.id,
    bookId: adamStrange1.id,
    quantity: 2,
    orderId: rosesFirstOrder.id,
    priceTimesQuantityAtCheckOut: adamStrange1.price * 2,
    //
  });
  await CartItem.create({
    userId: rose.id,
    bookId: xmen.id,
    quantity: 3,
    orderId: rosesFirstOrder.id,
    priceTimesQuantityAtCheckOut: xmen.price * 3,
    //
  });
  await CartItem.create({
    userId: rose.id,
    bookId: wonderWoman.id,
    quantity: 57,
    orderId: rosesFirstOrder.id,
    priceTimesQuantityAtCheckOut: wonderWoman.price * 57,
    //
  });

  console.log("...DONE SEEDING CARTITEMS");

  return;
};

module.exports = cartSeed;
