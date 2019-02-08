import React from 'react';
import logo from './logo.svg';
import Screenshot from 'component/Screenshot/Screenshot';
import Compare from 'component/Compare/Compare';
import ChangeLists from 'component/ChangeList/ChangeLists';
import './App.css';

import styles from './App.module.css';

import useHashRoute from 'hook/useHashRoute';
import changes from 'helper/changes';

const App = () => {
	const [route, setRoute] = useHashRoute();

	return (
		<div className={styles.root}>
			<header>
				<a href="#/home">
					<img src={logo} className="App-logo" alt="logo" />
				</a>
			</header>
			{route[0] === 'home' ? (
				<>
					<main>
						<ChangeLists />
					</main>
					<aside>
						<section>
							<div className="bar">asd</div>
							90% of this looks the same
						</section>
					</aside>
				</>
			) : (
				<main data-lightbox>
					<Compare {...changes[route[1]]} />
					<button
						onClick={() => {
							setRoute(['home']);
						}}
					>
						back
					</button>
				</main>
			)}
		</div>
	);
};

export default App;
