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
			'https://i.imgur.com/do79zD3.jpg',
			'https://i.imgur.com/6INW6uB.jpg',
		],
		name: 'desktop no change',
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

export default [...changes, ...changes];