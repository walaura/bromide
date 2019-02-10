import { useState, useEffect } from 'react';

const { localStorage } = window;

const prefix = 'vrva-q4hjkv65b98sdf-';

const usePersistentState = (key, defaultState, deserializer = a => a) => {
	const inLocalStorage = localStorage[prefix + key];
	const [state, setState] = useState(
		typeof inLocalStorage !== 'undefined'
			? deserializer(inLocalStorage)
			: defaultState
	);
	useEffect(() => {
		localStorage[prefix + key] = state;
	}, [state]);
	return [state, setState];
};

export default usePersistentState;
