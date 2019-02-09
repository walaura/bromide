import React, { useMemo, useEffect, useRef } from 'react';
import usePromise from 'react-use-promise';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadCry, faDog } from '@fortawesome/free-solid-svg-icons';

import Compare from 'component/Compare/Compare';
import FullScreenIcon from '../component/FullScreenIcon/FullScreenIcon';

import { getNavigation, getChange } from 'helper/changes';

const Image = ({ id, setRoute }) => {
	//eslint-disable-next-line no-unused-vars
	const [image, error, state] = usePromise(useMemo(() => getChange(id), [id]));
	const [cursor] = usePromise(useMemo(() => getNavigation(id), [id]));

	const ref = useRef(null);

	useEffect(() => {
		if (ref.current) {
			ref.current.focus();
		}
	}, [id, image]);

	return image ? (
		<main
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
			<Compare {...image} />
		</main>
	) : state !== 'resolved' ? (
		<main>
			<FullScreenIcon
				appearance={'loading'}
				icon={<FontAwesomeIcon icon={faDog} />}
			/>
		</main>
	) : (
		<main>
			<FullScreenIcon icon={<FontAwesomeIcon icon={faSadCry} />}>
				Not found
			</FullScreenIcon>
		</main>
	);
};

export default Image;
