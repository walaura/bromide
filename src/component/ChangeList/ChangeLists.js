import React from 'react';

import ChangeList from './ChangeList';
import styles from './ChangeLists.module.css';

import { colors, mix } from 'helper/color';

export default ({ list }) => {
	return (
		<div className={styles.root}>
			{list.map((c, index) => (
				<ChangeList
					color={mix(colors, index / (list.length - 1))}
					total={list
						.map(({ files }) => files.length)
						.reduce((prev, cur) => prev + cur, 0)}
					key={c.from + c.name}
					{...c}
				/>
			))}
		</div>
	);
};
