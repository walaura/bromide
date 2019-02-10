import React, { useState, useRef, useEffect } from 'react';

import styles from './ImageView.module.css';

export default ({ change, original, large, view }) => {
	const [minHeight, setMinHeight] = useState(0);

	const imageRefs = [useRef(null), useRef(null)];
	const containerRef = useRef(null);

	useEffect(() => {
		setMinHeight(
			Math.max(
				...imageRefs.map(r => r.current.getBoundingClientRect().height)
			) - 10
		);
	});

	return (
		<div
			className={styles.imgs}
			data-view={view}
			data-is-large={large}
			ref={containerRef}
			style={{
				height: (large && minHeight) > 0 ? minHeight : null,
			}}
		>
			<img
				ref={imageRefs[0]}
				className={styles.original}
				src={original}
				alt=""
			/>
			<img ref={imageRefs[1]} className={styles.change} src={change} alt="" />
		</div>
	);
};
