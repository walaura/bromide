/*eslint-disable no-undef*/
const getChanges = async () => {
	const changes = [...(WEBPACKGLOBALS.changes || [])];
	return changes.map(({ srcset, ...change }) => ({
		...change,
		srcset: {
			change: 'screenshots/' + btoa(srcset.change) + '.png',
			diff: 'screenshots/' + btoa(srcset.diff) + '.png',
			original: 'screenshots/' + btoa(srcset.original) + '.png',
		},
	}));
};
const getColors = async () => [...(WEBPACKGLOBALS.thresholds.colors || [])];
const getThresholds = async () => {
	const threshies = [...(WEBPACKGLOBALS.thresholds.thresholds || [])];
	if (threshies.length <= 0) {
		return [
			{
				from: 0,
				singular: 'total',
				plural: 'total',
			},
		];
	}

	return threshies.sort(({ from }, { from: secondFrom }) => from + secondFrom);
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
				({ difference }) =>
					difference >= from &&
					difference <= (index === 0 ? 1 : thresholds[index - 1].from)
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

export { getChangeList, getColors, getChange, getThresholds, getNavigation };
