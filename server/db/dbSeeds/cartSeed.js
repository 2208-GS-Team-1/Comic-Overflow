const { db, User, Book, Review, CartItem } = require("../");

const cartSeed = async (books, users) => {
  //console.log(`Magic methods are in here: ${Object.keys(User.prototype)}`);

  // Destruct users out of users object
  const { moe, lucy, larry, ethyl } = users;
  // Destruct books out of book object
  const { devilman1, adamStrange1, wonderWoman, silverSurfer, xmen } = books;

  // Moe has devilman volume 1 in his cart
  const moesFirstCartItem = await CartItem.create({
    priceAtPurchase: books.devilman1.price,
    userId: moe.id,
    bookId: devilman1.id,
  });

  // Moe has Wonder Woman in his cart.
  users.moe.addCartItem(books.wonderwoman);

  // Here are some ways to in
  // await moe.addCartItem(moesFirstCartItem);

  const moeFirstItemWithIncludes = await CartItem.findByPk(1, {
    include: [User, Book],
  });

  console.log(`Cart item ${moeFirstItemWithIncludes.id} is in 
      ${moeFirstItemWithIncludes.user.username}'s cart,
      and the book is ${moeFirstItemWithIncludes.book.title} 
      volume ${moeFirstItemWithIncludes.book.volume}`);

  return;
};

module.exports = cartSeed;
