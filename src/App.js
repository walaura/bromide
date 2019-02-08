import React from 'react';
import logo from './logo.svg';
import Screenshot from './Screenshot/Screenshot';
import './App.css';

import styles from './App.module.css';

import useHashRoute from './hook/useHashRoute';
import changes from './helper/changes';

const thresholds = [
	{
		from: 0.8,
		name: 'Things that have changed',
	},
	{
		from: 0.2,
		name: 'Things that may have changed',
	},
	{
		from: 0,
		name: 'Things that look the same',
	},
];

const changesList = thresholds.map(({ from, ...t }, index) => ({
	...t,
	from,
	files: changes
		.map((change, index) => ({ ...change, index }))
		.filter(
			({ diff }) =>
				diff >= from && diff <= (index === 0 ? 1 : thresholds[index - 1].from)
		),
}));

console.log(changesList);

const App = () => {
	const [route, setRoute] = useHashRoute();

	return (
		<div className={styles.root}>
			<header>
				<img src={logo} className="App-logo" alt="logo" />
			</header>
			{route[0] === 'home' ? (
				<>
					<main>
						{changesList.map(({ name, files }) => (
							<>
								<h2>{name}</h2>
								<section className={styles.grid}>
									{files.map(({ srcset, index, name, diff }) => (
										<Screenshot
											onClick={() => {
												setRoute(['image', index]);
											}}
											{...{ srcset, name, diff }}
										/>
									))}
								</section>
							</>
						))}
					</main>
					<aside>
						<section>
							<div className="bar">asd</div>
							90% of this looks the same
						</section>
					</aside>
				</>
			) : (
				<div>
					image view
					<Screenshot {...changes[route[1]]} />
					<button
						onClick={() => {
							setRoute(['home']);
						}}
					>
						back
					</button>
				</div>
			)}
		</div>
	);
};

export default App;
