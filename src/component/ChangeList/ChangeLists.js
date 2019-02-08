import React from 'react';

import ChangeList from './ChangeList';
import styles from './ChangeLists.module.css';
import changes from 'helper/changes';

const thresholds = [
	{
		from: 0.8,
		name: 'Things that have changed',
	},
	{
		from: 0.2,
		name: 'Things that may have changed',
	},
	{
		from: 0,
		name: 'Things that look the same',
	},
];

const changesList = thresholds.map(({ from, ...t }, index) => ({
	...t,
	from,
	files: changes
		.map((change, index) => ({ ...change, index }))
		.filter(
			({ diff }) =>
				diff >= from && diff <= (index === 0 ? 1 : thresholds[index - 1].from)
		),
}));

export default () => {
	return (
		<div className={styles.root}>
			{changesList.map(c => (
				<ChangeList key={c.from + c.name} {...c} />
			))}
		</div>
	);
};
