import React from 'react';

import ChangeList from './ChangeList';
import styles from './ChangeLists.module.css';

export default ({ list }) => {
	return (
		<div className={styles.root}>
			{list.map(c => (
				<ChangeList key={c.from + c.name} {...c} />
			))}
		</div>
	);
};
