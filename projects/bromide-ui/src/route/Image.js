import React, { useMemo, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadCry, faDog } from '@fortawesome/free-solid-svg-icons';
import useRemoteState from 'hook/useRemoteState';

import Compare from 'component/Compare/Compare';
import FullScreenIcon from '../component/FullScreenIcon/FullScreenIcon';

import { getNavigation, getChange } from 'helper/changes';
import styles from './Image.module.css';

const Image = ({ id, setRoute }) => {
	const { image, cursor, state } = useRemoteState(
		useMemo(async () => {
			const [image, cursor] = await Promise.all([
				getChange(id),
				getNavigation(id),
			]);
			return { image, cursor };
		}, [id]),
		{
			whenLoading: {
				cursor: null,
			},
		}
	);
	const ref = useRef(null);
	useEffect(() => {
		if (ref.current) {
			ref.current.focus();
		}
	}, [id, image]);

	return (
		<main>
			{image ? (
				<div
					className={styles.root}
					tabIndex="0"
					ref={ref}
					onKeyUp={({ key }) => {
						if (!cursor) return;
						if (key === 'ArrowLeft') {
							setRoute(['image', cursor.prev]);
						} else if (key === 'ArrowRight') {
							setRoute(['image', cursor.next]);
						}
					}}
				>
					<Compare {...image} id={id} />
				</div>
			) : state !== 'resolved' ? (
				<FullScreenIcon
					appearance={'loading'}
					icon={<FontAwesomeIcon icon={faDog} />}
				/>
			) : (
				<FullScreenIcon icon={<FontAwesomeIcon icon={faSadCry} />}>
					Not found
				</FullScreenIcon>
			)}
		</main>
	);
};

export default Image;
