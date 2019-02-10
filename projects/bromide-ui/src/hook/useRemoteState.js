import { useLayoutEffect, useState, useRef } from 'react';

const usePromise = promise => {
	const defaultState = {
		result: null,
		error: null,
		state: 'pending',
	};

	const [{ result, error, state }, setState] = useState(defaultState);
	const promiseRef = useRef(promise);

	useLayoutEffect(() => {
		promise
			.then(result => {
				setState({
					result,
					state: 'resolved',
				});
			})
			.catch(error => {
				setState({
					error,
					state: 'error',
				});
			});
	}, [promise]);

	/* this prevents setState being stale for a tick */
	if (promiseRef.current !== promise) {
		promiseRef.current = promise;
		return { ...defaultState };
	}
	return { result, error, state };
};

const useRemoteState = (
	promise,
	{ whenLoading = {}, whenError = {}, whenResolved = {} } = {}
) => {
	const { result, error, state } = usePromise(promise);

	if (state === 'resolved') {
		return { state, ...result, ...whenResolved };
	} else if (state === 'error') {
		console.error(error);
		return {
			state,
			error,
			...whenLoading,
			...whenError,
		};
	}
	return { state, ...whenLoading };
};

export default useRemoteState;
