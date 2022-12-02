import React from 'react';
// import Home from './Home';
import Home from './Home/Home.jsx';
import { Link, Routes, Route } from 'react-router-dom';
import Books from './Books';
import Account from './Account.jsx';
import Login from './Login.jsx';

const App = () => {
	return (
		<div>
			<div className="main_header">
				<h1>Comic Overflow</h1>
			</div>

			<div>
				<nav className="navbar">
					<Link to="/">Home</Link>
					<Link to="/books">Books</Link>
					<Link to="/login">Log-In</Link>
					<Link to="/createaccount">Create Account</Link>
				</nav>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/books" element={<Books />} />
					<Route path="/login" element={<Login />} />
					<Route path="/createaccount" element={<Account />} />
				</Routes>
			</div>
		</div>
	);
};

export default App;
