import React, { useState } from 'react';

import styles from './HoverTabs.module.css';

const HoverTabs = ({ tabs, activeTab, onHover, onClick, className, small }) => {
	const [hovered, setHovered] = useState(activeTab);

	return (
		<div
			className={[styles.tabs, className].join(' ')}
			data-small={small}
			onMouseLeave={() => {
				setHovered(null);
				onHover(activeTab);
			}}
		>
			{tabs.map((tab, index) => (
				<button
					data-active={index === activeTab}
					data-hover-active={index === hovered}
					key={index}
					onMouseEnter={() => {
						onHover(index);
						setHovered(index);
					}}
					onClick={() => {
						onClick(index);
					}}
				>
					{tab}
				</button>
			))}
		</div>
	);
};

HoverTabs.defaultProps = {
	onHover: () => {},
};

export default HoverTabs;
