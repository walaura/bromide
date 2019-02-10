import { useState, useEffect } from 'react';

const { location, removeEventListener, addEventListener } = window;

const parseHashURL = url =>
	new URL(url).hash
		.split('#/')
		.pop()
		.split('/');

const useHashRoute = () => {
	const [route, setRoute] = useState(parseHashURL(location));
	const hashChangeHandler = ev => {
		ev.preventDefault();
		setRoute(parseHashURL(ev.newURL));
	};

	useEffect(() => {
		window.location.hash = '#/' + route.join('/');
	}, [route]);
	useEffect(() => {
		addEventListener('hashchange', hashChangeHandler);
		return () => {
			removeEventListener('hashchange', hashChangeHandler);
		};
	}, []);

	return [route, setRoute];
};

export default useHashRoute;
