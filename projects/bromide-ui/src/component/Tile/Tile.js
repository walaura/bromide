import React, { useState, useEffect } from 'react';

import Title from 'component/Title/Title';

import styles from './Tile.module.css';

const Tile = ({ srcset, name, tiny, difference, hasLargeImages, ...props }) => {
	const defaultThumb = difference === 0 ? srcset.change : srcset.diff;
	const [thumb, setThumb] = useState(defaultThumb);
	const [aspectRatio, setAspectRatio] = useState(1);
	useEffect(() => {
		if (hasLargeImages) {
			const img = new Image();
			img.onload = function() {
				setAspectRatio(img.height / img.width);
			};
			img.src = defaultThumb;
		} else {
			setAspectRatio(1);
		}
	}, [defaultThumb, hasLargeImages]);

	return (
		<a
			{...props}
			className={styles.root}
			data-is-tiny={tiny}
			onMouseEnter={() => {
				setThumb(srcset.change);
			}}
			onMouseLeave={() => {
				setThumb(defaultThumb);
			}}
		>
			<Title className={styles.title} {...{ name, difference }} />
			<div
				className={styles.img}
				style={{
					backgroundImage: `url(${thumb})`,
					paddingTop: `${aspectRatio * 100}%`,
				}}
			/>
		</a>
	);
};

export default Tile;
