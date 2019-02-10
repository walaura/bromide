import usePromise from 'react-use-promise';

const useRemoteState = (
	promise,
	{ id, whenLoading = {}, whenError = {}, whenResolved = {} } = {}
) => {
	const [result, error, state] = usePromise(promise);
	return result;
};

export default useRemoteState;
