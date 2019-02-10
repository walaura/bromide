import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';

import usePersistentState from 'hook/usePersistentState';
import HoverTabs from 'component/HoverTabs/HoverTabs';
import ImageView from 'component/ImageView/ImageView';
import Title from 'component/Title/Title';

import { views } from 'helper/views';
import styles from './Compare.module.css';

export default ({ srcset, name, diff, ...props }) => {
	const [selectedView, setSelectedView] = usePersistentState('view', 0, v =>
		Number(v)
	);
	const [hoverView, setHoverView] = useState(selectedView);
	const [large, setLarge] = usePersistentState(
		'lg',
		false,
		val => val === 'true'
	);

	useEffect(() => {
		if (diff === 0) {
			setHoverView(3);
		}
	}, [diff]);

	console.log(hoverView);

	return (
		<div className={styles.root} {...props}>
			<div className={styles.header}>
				<Title className={styles.title} {...{ name, diff }} />
				<div>
					{diff === 0 ? (
						<span>This one looks the same!</span>
					) : (
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
					<HoverTabs
						small
						className={styles.scaler}
						tabs={[
							<FontAwesomeIcon icon={faCompress} />,
							<FontAwesomeIcon icon={faExpand} />,
						]}
						activeTab={large ? 1 : 0}
						onClick={tab => {
							setLarge(tab === 1);
						}}
					/>
				</div>
			</div>
			<ImageView {...srcset} view={views[hoverView].key} large={large} />
		</div>
	);
};
