import React, { useState, useRef, useEffect } from 'react';

import styles from './ImageView.module.css';

export default ({ srcset, large, view }) => {
	const [minHeight, setMinHeight] = useState(0);

	const imageRefs = [useRef(null), useRef(null)];

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
	);
};
