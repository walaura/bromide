import React, { useMemo } from 'react';
import usePromise from 'react-use-promise';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog } from '@fortawesome/free-solid-svg-icons';

import ChangeList from 'component/ChangeList/ChangeList';
import FullScreenIcon from 'component/FullScreenIcon/FullScreenIcon';

import { mix } from 'helper/color';
import { getChangeList, getColors } from 'helper/changes';

import styles from './Lists.module.css';

export default () => {
	const [list] = usePromise(useMemo(() => getChangeList(), []));
	const [colors] = usePromise(useMemo(() => getColors(), []));
	return list && colors ? (
		<div className={styles.root}>
			{list.map((c, index) => (
				<ChangeList
					color={
						(colors.length > 0 && list.length) > 1
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
	) : (
		<FullScreenIcon
			appearance={'loading'}
			icon={<FontAwesomeIcon icon={faDog} />}
		/>
	);
};
