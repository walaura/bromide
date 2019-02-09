import React from 'react';

import styles from './HoverTabs.module.css';

const HoverTabs = ({ tabs, activeTab, onHover, onClick, className, small }) => {
	return (
		<div
			className={[styles.tabs, className].join(' ')}
			data-small={small}
			onMouseLeave={() => {
				onHover(activeTab);
			}}
		>
			{tabs.map((tab, index) => (
				<button
					className={styles.button}
					data-active={index === Number(activeTab)}
					key={index}
					onMouseEnter={() => {
						onHover(index);
					}}
					onClick={() => {
						onClick(index);
					}}
				>
					<span className={styles.contents}>{tab}</span>
				</button>
			))}
		</div>
	);
};

HoverTabs.defaultProps = {
	onHover: () => {},
};

export default HoverTabs;
