import React from 'react';

import styles from './Screenshot.module.css';

const Screenshot = ({ srcset, name, diff, ...props }) => (
	<a className={styles.root} {...props}>
		<img alt="" src={srcset[0]} />
		<div className={styles.name}>
			<h4>{name}</h4>
			<span>{diff}</span>
		</div>
	</a>
);

export default Screenshot;