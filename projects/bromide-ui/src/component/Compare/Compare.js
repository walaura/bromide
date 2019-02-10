import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';

import usePersistentState from 'hook/usePersistentState';
import { usePersistentToggle } from 'hook/useToggle';
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
	const [large, setLarge] = usePersistentToggle('lg', false);

	useEffect(() => {
		if (difference === 0) {
			setHoverView(3);
		}
	}, [difference, id]);

	return (
		<div className={styles.root} {...props}>
			<div className={styles.header}>
				<ImageInfo {...{ name, difference, id }} />
				<div>
					{difference === 0 ? null : (
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
