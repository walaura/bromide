import { useState } from 'react';

import usePersistentState from './usePersistentState';

const toggle = fn => (to = null) => {
	if (to === null) {
		fn(s => !s);
	} else {
		fn(to);
	}
};

const useToggle = (defaultState = true) => {
	const [state, setState] = useState(defaultState);
	return [state, toggle(setState)];
};

const usePersistentToggle = (key, defaultState = true) => {
	const [state, setState] = usePersistentState(
		key,
		defaultState,
		s => s === 'true'
	);
	return [state, toggle(setState)];
};

export { usePersistentToggle };
export default useToggle;
