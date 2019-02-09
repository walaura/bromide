import React from 'react';
import Compare from 'component/Compare/Compare';
import ChangeLists from 'component/ChangeList/ChangeLists';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClone, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import styles from './App.module.css';

import useHashRoute from 'hook/useHashRoute';
import { getChangeList, getNavigation, getChange } from 'helper/changes';

const list = getChangeList();

const App = () => {
	const [route, setRoute] = useHashRoute();
	return (
		<div className={styles.root}>
			<header className={styles.header}>
				<a href="#/">
					{!route[0] ? (
						<FontAwesomeIcon icon={faClone} />
					) : (
						<FontAwesomeIcon icon={faArrowLeft} />
					)}
				</a>
			</header>
			{!route[0] ? (
				<main>
					<ChangeLists list={list} />
				</main>
			) : (
				<main
					tabIndex="0"
					data-lightbox
					onKeyUp={({ key }) => {
						const { prev, next } = getNavigation(list, route[1]);
						if (key === 'ArrowLeft') {
							setRoute(['image', prev]);
						} else if (key === 'ArrowRight') {
							setRoute(['image', next]);
						}
					}}
				>
					<Compare {...getChange(route[1])} />
				</main>
			)}
		</div>
	);
};

export default App;
