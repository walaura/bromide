import React, { useState } from 'react';

import Title from 'component/Title/Title';

import styles from './Tile.module.css';

const Tile = ({ original, current, name, diff, ...props }) => {
	const [thumb, setThumb] = useState(current);
	return (
		<a
			{...props}
			className={styles.root}
			onMouseEnter={() => {
				setThumb(original);
			}}
			onMouseLeave={() => {
				setThumb(current);
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
