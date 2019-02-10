import { createContext } from 'react';

export const defaultState = {
	hasLargeImages: true,
	imageSize: 0.75,
};

export const ViewOptionsContext = createContext(defaultState);
