import React from 'react';

import styles from './Toggle.module.css';

const Toggle = ({
	whenTrue,
	whenFalse,
	state,
	vertical,
	className,
	...props
}) => {
	return (
		<button
			data-vertical={vertical === true}
			className={[styles.root, className].join(' ')}
			{...props}
		>
			<div data-selected={state === true}>{whenTrue}</div>
			<div data-selected={state === false}>{whenFalse}</div>
		</button>
	);
};

export default Toggle;
