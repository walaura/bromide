import { useState } from 'react';

const useToggle = (defaultState = true) => {
	const [state, setState] = useState(defaultState);
	const toggle = (to = null) => {
		if (to === null) {
			setState(s => !s);
		} else {
			setState(to);
		}
	};
	return [state, toggle];
};

export default useToggle;
