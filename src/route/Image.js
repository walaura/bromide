import React, { useMemo, useEffect, useRef } from 'react';
import usePromise from 'react-use-promise';

import Compare from 'component/Compare/Compare';
import { getNavigation, getChange } from 'helper/changes';

const Image = ({ id, setRoute }) => {
	const [image] = usePromise(useMemo(() => getChange(id), [id]));
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
	) : (
		<main>{'Not found'}</main>
	);
};

export default Image;
