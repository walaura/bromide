import React from 'react';

import styles from './FullScreenIcon.module.css';

const FullScreenIcon = ({ icon, appearance, children }) => {
	return (
		<div className={styles.root} data-appearance={appearance}>
			{icon}
			<div className={styles.children}>{children}</div>
		</div>
	);
};

export default FullScreenIcon;
