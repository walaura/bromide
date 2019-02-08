import React, { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
	const [count, setCount] = useState(0);
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
					{count}
					<button onClick={() => setCount(c => c + 1)}>+</button>
					<button onClick={() => setCount(c => c - 1)}>-</button>
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
};

export default App;
