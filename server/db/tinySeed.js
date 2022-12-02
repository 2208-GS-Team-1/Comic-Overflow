const db = require('./db');
const { User, Book, Cart, Review } = require('./');

const tinySeed = async () => {
	await db.sync({ force: true });

	const [ben, louis] = await Promise.all([
		User.create({ username: 'ben', password: '123' }),
		User.create({ username: 'louis', password: '123' }),
	]);

	const [devilman1] = await Promise.all([
		Book.create({
			title: 'Devilman',
			author: 'Nagai Go',
			description: 'a really cool manga',
			genre: 'action',
			volume: 1,
			yearOfPublish: 1972,
			imageURL: '/img/devilman1.jpg',
		}),
	]);
	return {
		users: {
			ben,
			louis,
		},
		books: { devilman1 },
	};
};

module.exports = tinySeed;
