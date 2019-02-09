import React, { useMemo } from 'react';
import usePromise from 'react-use-promise';

import Compare from 'component/Compare/Compare';
import { getNavigation, getChange } from 'helper/changes';

const Image = ({ id, setRoute }) => {
	const [image, error, state] = usePromise(useMemo(() => getChange(id), [id]));
	return image ? (
		<main
			tabIndex="0"
			data-lightbox
			onKeyUp={({ key }) => {
				const { prev, next } = getNavigation(image);
				if (key === 'ArrowLeft') {
					setRoute(['image', prev]);
				} else if (key === 'ArrowRight') {
					setRoute(['image', next]);
				}
			}}
		>
			<Compare {...image} />
		</main>
	) : (
		<main>{state === 'resolved' ? 'Not found' : ''}</main>
	);
};

export default Image;
