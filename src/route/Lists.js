import React, { useMemo } from 'react';
import usePromise from 'react-use-promise';

import ChangeList from 'component/ChangeList/ChangeList';
import styles from './Lists.module.css';

import { colors, mix } from 'helper/color';
import { getChangeList } from 'helper/changes';

export default () => {
	const [list] = usePromise(useMemo(() => getChangeList(), []));
	return (
		<div className={styles.root}>
			{list &&
				list.map((c, index) => (
					<ChangeList
						color={
							list.length > 1
								? mix(colors, index / (list.length - 1))
								: undefined
						}
						total={list
							.map(({ files }) => files.length)
							.reduce((prev, cur) => prev + cur, 0)}
						key={c.from + c.singular + c.plural}
						{...c}
					/>
				))}
		</div>
	);
};
