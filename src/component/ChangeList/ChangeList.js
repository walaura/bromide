import React from 'react';
import Screenshot from 'component/Screenshot/Screenshot';

import styles from './ChangeList.module.css';

export default ({ name, files }) => {
	return (
		<>
			<h2 className={styles.head}>{name}</h2>
			<section className={styles.grid}>
				{files.map(({ srcset, index, name, diff }) => (
					<Screenshot
						href={['#', 'image', index].join('/')}
						{...{ srcset, name, diff }}
					/>
				))}
			</section>
		</>
	);
};
