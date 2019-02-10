import React from 'react';

import styles from './Title.module.css';

export default ({ name, difference, className }) => (
	<div className={[styles.root, className].join(' ')}>
		<strong className={styles.txt}>{name}</strong>
		{difference !== null && difference !== 0 && (
			<span title={difference} className={styles.score}>
				{Math.ceil(difference * 100)}%
			</span>
		)}
	</div>
);
