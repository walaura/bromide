import React, { useMemo } from 'react';
import usePromise from 'react-use-promise';

import { getThresholds, getThreshold } from 'helper/changes';
import { hsl, withLuminance, getColorForThreshold } from 'helper/color';
import Title from 'component/Title/Title';

import styles from './ImageInfo.module.css';

export default ({ name, difference, id }) => {
	const [threshold] = usePromise(
		useMemo(async () => {
			const threshold = await getThreshold(id);
			const thresholds = await getThresholds();
			return {
				...thresholds[threshold],
				color: await getColorForThreshold(threshold),
			};
		}, [id])
	);

	let color = (threshold || {}).color;
	if (!color) color = [0, 0, 0];

	return (
		<div className={styles.root}>
			<span
				style={{ background: hsl(withLuminance(color, 0.8)) }}
				className={styles.dot}
			/>
			<div>
				<Title className={styles.title} {...{ name, difference }} />
				{threshold && (
					<span
						className={styles.infoThreshold}
						style={{ color: hsl(withLuminance(color, 0.25)) }}
					>
						{threshold.singular}
					</span>
				)}
			</div>
		</div>
	);
};
