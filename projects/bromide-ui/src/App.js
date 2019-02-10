import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClone, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import Image from 'route/Image';
import Lists from 'route/Lists';
import styles from './App.module.css';

import useHashRoute from 'hook/useHashRoute';

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
			{!route[0] ? <Lists /> : <Image id={route[1]} {...{ setRoute }} />}
		</div>
	);
};

export default App;
