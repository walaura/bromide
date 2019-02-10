import React from 'react';

import styles from './Title.module.css';

export default ({ name, diff, className }) => (
	<div className={[styles.root, className].join(' ')}>
		<strong className={styles.txt}>{name}</strong>
		<span title={diff} className={styles.score}>
			{Math.ceil(diff * 100)}%
		</span>
	</div>
);
