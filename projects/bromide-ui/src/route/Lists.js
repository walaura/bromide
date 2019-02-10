import React, { useMemo } from 'react';
import usePromise from 'react-use-promise';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faDog,
	faRulerCombined,
	faRulerVertical,
} from '@fortawesome/free-solid-svg-icons';

import { ViewOptionsContext, defaultState } from 'context/viewOptions';
import { usePersistentToggle } from 'hook/useToggle';
import usePersistentState from 'hook/usePersistentState';
import ChangeList from 'component/ChangeList/ChangeList';
import Slider from 'component/Slider/Slider';
import Toggle from 'component/Toggle/Toggle';
import FullScreenIcon from 'component/FullScreenIcon/FullScreenIcon';

import { mix } from 'helper/color';
import { getChangeList, getColors } from 'helper/changes';

import styles from './Lists.module.css';

export default () => {
	const [list] = usePromise(useMemo(() => getChangeList(), []));
	const [colors] = usePromise(useMemo(() => getColors(), []));
	const [hasLargeImages, setHasLargeImages] = usePersistentToggle(
		'lg-list',
		defaultState.hasLargeImages
	);
	const [imageSize, setImageSize] = usePersistentState(
		'img-size',
		defaultState.imageSize
	);

	return list && colors ? (
		<ViewOptionsContext.Provider value={{ hasLargeImages, imageSize }}>
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
				<div>
					<Slider
						vertical
						onChange={ev => {
							setImageSize(ev.target.value);
						}}
						value={imageSize}
					/>
				</div>
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
