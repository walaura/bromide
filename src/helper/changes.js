/*eslint-disable no-undef*/
const getChanges = async () => [...WEBPACKGLOBALS.changes];
const getThresholds = async () => {
	const threshies = [...WEBPACKGLOBALS.thresholds];
	if (threshies.length <= 0) {
		return [
			{
				from: 0,
				singular: 'total',
				plural: 'total',
			},
		];
	}
	return threshies;
};
/*eslint-enable*/

const getChangeList = async () => {
	const [changes, thresholds] = await Promise.all([
		getChanges(),
		getThresholds(),
	]);

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

const getNavigation = async currentImage => {
	const list = await getChangeList();
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

const getChange = async id => {
	const changes = await getChanges();
	return changes[id];
};

export { getChangeList, getChange, getNavigation };
