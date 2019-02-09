import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';

import HoverTabs from 'component/HoverTabs/HoverTabs';
import ImageView from 'component/ImageView/ImageView';
import Title from 'component/Title/Title';

import { views } from 'helper/views';
import styles from './Compare.module.css';

export default ({ srcset, name, diff, ...props }) => {
	const [selectedView, setSelectedView] = useState(0);
	const [hoverView, setHoverView] = useState(selectedView);
	const [large, setLarge] = useState(false);

	return (
		<div className={styles.root} {...props}>
			<div className={styles.header}>
				<Title className={styles.title} {...{ name, diff }} />
				<div>
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
			<ImageView srcset={srcset} view={views[hoverView].key} large={large} />
		</div>
	);
};
