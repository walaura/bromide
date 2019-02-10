import React, { useState, useEffect, useMemo } from 'react';
import usePromise from 'react-use-promise';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';

import usePersistentState from 'hook/usePersistentState';
import { usePersistentToggle } from 'hook/useToggle';
import { getThresholds, getThreshold } from 'helper/changes';
import { getColorForThreshold } from 'helper/color';
import { views } from 'helper/views';

import HoverTabs from 'component/HoverTabs/HoverTabs';
import ImageView from 'component/ImageView/ImageView';
import Toggle from 'component/Toggle/Toggle';

import styles from './Compare.module.css';
import ImageInfo from './ImageInfo/ImageInfo';

export default ({ srcset, name, difference, id, ...props }) => {
	const [selectedView, setSelectedView] = usePersistentState('view', 0, v =>
		Number(v)
	);
	const [hoverView, setHoverView] = useState(selectedView);
	const [threshold] = usePromise(
		useMemo(async () => {
			const threshold = await getThreshold(id);
			const thresholds = await getThresholds();
			return {
				...thresholds[threshold],
				color: await getColorForThreshold(threshold),
			};
		}, [id])
	);
	const [large, setLarge] = usePersistentToggle('lg', false);

	useEffect(() => {
		if (difference === 0) {
			setHoverView(3);
		}
	}, [difference]);

	return (
		<div className={styles.root} {...props}>
			<div className={styles.header}>
				<ImageInfo {...{ name, difference, id }} />
				<div>
					{difference === 0 && threshold ? null : (
						<HoverTabs
							tabs={views.map(({ name }) => name)}
							activeTab={selectedView}
							onHover={tab => {
								setHoverView(tab);
							}}
							onClick={tab => {
								setSelectedView(tab);
							}}
						/>
					)}
					<Toggle
						className={styles.scaler}
						state={large}
						onClick={() => setLarge(l => !l)}
						whenTrue={<FontAwesomeIcon icon={faExpand} />}
						whenFalse={<FontAwesomeIcon icon={faCompress} />}
					/>
				</div>
			</div>
			<ImageView {...srcset} view={views[hoverView].key} large={large} />
		</div>
	);
};
