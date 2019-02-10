import React, { useMemo } from 'react';

import { getThresholds, getThreshold } from 'helper/changes';
import { hsl, withLuminance, getColorForThreshold } from 'helper/color';
import Title from 'component/Title/Title';
import useRemoteState from 'hook/useRemoteState';

import styles from './ImageInfo.module.css';

export default ({ name, difference, id }) => {
	const threshold = useRemoteState(
		useMemo(async () => {
			const threshold = await getThreshold(id);
			const thresholds = await getThresholds();
			return {
				...thresholds[threshold],
				color: await getColorForThreshold(threshold),
			};
		}, [id]),
		{
			whenLoading: {
				color: [0, 0, 0],
			},
		}
	);

	return (
		<div className={styles.root}>
			<span
				style={{ background: hsl(withLuminance(threshold.color, 0.8)) }}
				className={styles.dot}
			/>
			<div>
				<Title className={styles.title} {...{ name, difference }} />
				{threshold.singular && (
					<span
						className={styles.infoThreshold}
						style={{ color: hsl(withLuminance(threshold.color, 0.25)) }}
					>
						{threshold.singular}
					</span>
				)}
			</div>
		</div>
	);
};
