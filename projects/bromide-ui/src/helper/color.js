import { getChangeList, getColors } from 'helper/changes';

const mixNumber = (b, a, perc) => Math.floor(b + (a - b) * perc);
const mixMap = (a, b, perc) =>
	a.map((_, index) => mixNumber(_, b[index], perc));

const mix = (colors, perc) => {
	const step = Math.floor((perc * 99.99 * (colors.length - 1)) / 100);
	const mod = (perc * 99.99 * (colors.length - 1)) % 100;
	return mixMap(colors[step], colors[step + 1], mod / 100);
};
const hsl = ([hue, sat, lum]) => `hsl(${hue}, ${sat}%, ${lum}%)`;
const withLuminance = ([hue, sat, lum], factor) => [hue, sat, lum * factor];

const getColorForThreshold = async index => {
	const list = await getChangeList();
	const colors = await getColors();
	return colors.length > 0 && list.length > 1
		? mix(colors, index / (list.length - 1))
		: undefined;
};
export { mix, hsl, withLuminance, getColorForThreshold };
