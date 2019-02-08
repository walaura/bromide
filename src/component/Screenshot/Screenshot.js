import React, { useState } from 'react';

import Title from 'component/Title/Title';

import styles from './Screenshot.module.css';

const Screenshot = ({ srcset, name, diff, ...props }) => {
	const [thumb, setThumb] = useState(srcset[1]);
	return (
		<a
			{...props}
			className={styles.root}
			onMouseEnter={() => {
				setThumb(srcset[0]);
			}}
			onMouseLeave={() => {
				setThumb(srcset[1]);
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

export default Screenshot;
