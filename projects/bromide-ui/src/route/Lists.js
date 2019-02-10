import React, { useMemo } from 'react';
import usePromise from 'react-use-promise';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faDog,
	faRulerCombined,
	faRulerVertical,
} from '@fortawesome/free-solid-svg-icons';

import { ViewOptionsContext } from 'context/viewOptions';
import useToggle from 'hook/useToggle';
import ChangeList from 'component/ChangeList/ChangeList';
import Toggle from 'component/Toggle/Toggle';
import FullScreenIcon from 'component/FullScreenIcon/FullScreenIcon';

import { mix } from 'helper/color';
import { getChangeList, getColors } from 'helper/changes';

import styles from './Lists.module.css';

export default () => {
	const [list] = usePromise(useMemo(() => getChangeList(), []));
	const [colors] = usePromise(useMemo(() => getColors(), []));
	const [hasLargeImages, setHasLargeImages] = useToggle();

	return list && colors ? (
		<ViewOptionsContext.Provider value={{ hasLargeImages }}>
			<main className={styles.root}>
				{list.map(
					(c, index) =>
						c.files.length > 0 && (
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
						)
				)}
			</main>
			<aside className={styles.aside}>
				<Toggle
					vertical={true}
					state={hasLargeImages}
					onClick={() => setHasLargeImages()}
					whenTrue={<FontAwesomeIcon icon={faRulerVertical} />}
					whenFalse={<FontAwesomeIcon icon={faRulerCombined} />}
				/>
			</aside>
		</ViewOptionsContext.Provider>
	) : (
		<main>
			<FullScreenIcon
				appearance={'loading'}
				icon={<FontAwesomeIcon icon={faDog} />}
			/>
		</main>
	);
};
