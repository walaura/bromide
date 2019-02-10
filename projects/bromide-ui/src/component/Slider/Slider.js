import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import styles from './Slider.module.css';

export default ({ className, vertical, value, onChange, ...props }) => (
	<div className={[styles.root, className].join(' ')} data-vertical={vertical}>
		<div className={styles.inner}>
			<button
				class={styles.svg}
				onClick={() => onChange({ target: { value: Number(value) - 0.1 } })}
			>
				<FontAwesomeIcon icon={faMinus} />
			</button>
			<input
				{...props}
				type="range"
				min={0}
				max={1}
				step="0.01"
				onChange={onChange}
				value={value}
			/>
			<button
				class={styles.svg}
				onClick={() => onChange({ target: { value: Number(value) + 0.1 } })}
			>
				<FontAwesomeIcon icon={faPlus} />
			</button>
		</div>
	</div>
);
