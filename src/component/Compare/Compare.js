import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';

import HoverTabs from 'component/HoverTabs/HoverTabs';
import Title from 'component/Title/Title';

import styles from './Compare.module.css';

export default ({ srcset, name, diff, ...props }) => {
	const views = [
		{ key: 'sbs', name: 'Side by side' },
		{ key: 'diff', name: 'Difference' },
		{ key: 'original', name: 'Original' },
		{ key: 'new', name: 'New' },
	];

	const [view, setView] = useState(0);
	const [hoverView, setHoverView] = useState(view);
	const [large, setLarge] = useState(false);
	const [minHeight, setMinHeight] = useState(0);

	const imageRefs = [useRef(null), useRef(null)];

	useEffect(() => {
		setMinHeight(
			Math.max(...imageRefs.map(r => r.current.getBoundingClientRect().height))
		);
	});

	return (
		<div className={styles.root} {...props}>
			<div className={styles.header}>
				<Title className={styles.title} {...{ name, diff }} />
				<div>
					<HoverTabs
						tabs={views.map(({ name }) => name)}
						activeTab={view}
						onHover={tab => {
							setHoverView(tab);
						}}
						onClick={tab => {
							setView(tab);
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
			<div
				className={styles.imgs}
				data-view={views[hoverView].key}
				data-is-large={large}
				style={{
					height: (large && minHeight) > 0 ? minHeight : null,
				}}
			>
				<img
					ref={imageRefs[0]}
					className={styles.original}
					src={srcset[0]}
					alt=""
				/>
				<img ref={imageRefs[1]} className={styles.new} src={srcset[1]} alt="" />
			</div>
		</div>
	);
};
