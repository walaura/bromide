const changes = [
	{
		srcset: [
			'https://i.imgur.com/do79zD3.jpg',
			'https://i.imgur.com/6INW6uB.jpg',
		],
		name: 'desktop high',
		diff: 0.862,
	},
	{
		srcset: [
			'https://i.imgur.com/do79zD3.jpg',
			'https://i.imgur.com/6INW6uB.jpg',
		],
		name: 'desktop high',
		diff: 0.9,
	},
	{
		srcset: [
			'https://i.imgur.com/8Zq7P8U.jpg',
			'https://i.imgur.com/j4St81q.jpg',
		],
		name: 'pikachu no change',
		diff: 0.01,
	},
	{
		srcset: [
			'https://i.imgur.com/do79zD3.jpg',
			'https://i.imgur.com/6INW6uB.jpg',
		],
		name: 'desktop mid',
		diff: 0.34,
	},
];

const getChangeList = () => {
	const thresholds = [
		{
			from: 0.8,
			name: 'Things that have changed',
		},
		{
			from: 0.2,
			name: 'Things that may have changed',
		},
		{
			from: 0,
			name: 'Things that look the same',
		},
	];

	return thresholds.map(({ from, ...t }, index) => ({
		...t,
		from,
		files: changes
			.map((change, index) => ({ ...change, index }))
			.filter(
				({ diff }) =>
					diff >= from && diff <= (index === 0 ? 1 : thresholds[index - 1].from)
			),
	}));
};

const getNavigation = (list, currentImage) => {
	const flat = list
		.map(({ files }, threshold) =>
			files.map(file => ({
				...file,
				threshold,
			}))
		)
		.reduce((prev, cur) => [...prev, ...cur], []);
	const index = flat.findIndex(({ index }) => index === Number(currentImage));

	const [prev, next] = [
		index <= 0 ? flat.length - 1 : index - 1,
		index >= flat.length - 1 ? 0 : index + 1,
	].map(id => flat[id].index);

	return { prev, next };
};

const getChange = id => changes[id];

export { getChangeList, getChange, getNavigation };
