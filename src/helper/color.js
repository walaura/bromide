/*green, blue, pink */
const colors = [[138, 87, 78], [216, 87, 78], [331, 88, 80]];

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
export { colors, mix, hsl, withLuminance };
