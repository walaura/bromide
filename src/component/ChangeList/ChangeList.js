import React, { useState } from 'react';
import Screenshot from 'component/Screenshot/Screenshot';

import styles from './ChangeList.module.css';

const useToggle = (defaultState = true) => {
	const [state, setState] = useState(defaultState);
	const toggle = (to = null) => {
		if (to === null) {
			console.log(12);
			setState(s => !s);
		} else {
			setState(to);
		}
	};
	return [state, toggle];
};

export default ({ name, files }) => {
	const [toggleState, toggle] = useToggle();
	return (
		<div>
			<button
				className={styles.headerBtn}
				onClick={() => {
					toggle();
				}}
			>
				<header className={styles.header}>
					<h3 className={styles.counter}>{files.length}</h3>
					<h2 className={styles.head}>{name}</h2>
				</header>
			</button>
			{toggleState && (
				<section className={styles.grid}>
					{files.map(({ srcset, index, name, diff }) => (
						<Screenshot
							key={index}
							href={['#', 'image', index].join('/')}
							{...{ srcset, name, diff }}
						/>
					))}
				</section>
			)}
		</div>
	);
};
