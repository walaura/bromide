import React from 'react';

import styles from './Screenshot.module.css';

const Screenshot = ({ srcset, name, diff, ...props }) => (
	<a className={styles.root} {...props}>
		<div
			className={styles.img}
			style={{ backgroundImage: `url(${srcset[0]})` }}
		/>
		<div className={styles.name}>
			<h4>{name}</h4>
			<span className={styles.score}>{diff}</span>
		</div>
	</a>
);

export default Screenshot;
