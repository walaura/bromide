import React from 'react';

import styles from './Compare.module.css';

export default ({ srcset, name, diff, ...props }) => (
	<div className={styles.root} {...props}>
		<div className={styles.imgs}>
			<img src={srcset[0]} alt="" />
			<img src={srcset[1]} alt="" />
		</div>
		<div className={styles.name}>
			<h4>{name}</h4>
			<span className={styles.score}>{diff}</span>
		</div>
	</div>
);
