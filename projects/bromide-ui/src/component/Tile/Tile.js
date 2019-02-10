import React, { useState } from 'react';

import Title from 'component/Title/Title';

import styles from './Tile.module.css';

const Tile = ({ original, change, name, diff, ...props }) => {
	const [thumb, setThumb] = useState(change);
	return (
		<a
			{...props}
			className={styles.root}
			onMouseEnter={() => {
				setThumb(original);
			}}
			onMouseLeave={() => {
				setThumb(change);
			}}
		>
			<div
				className={styles.img}
				style={{ backgroundImage: `url(${thumb})` }}
			/>
			<Title {...{ name, diff }} />
		</a>
	);
};

export default Tile;
