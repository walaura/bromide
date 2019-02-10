#!/usr/bin/env node

const { resolve } = require('path');
const { readdirSync, writeFileSync } = require('fs');
const { sync: copydir } = require('copy-dir');
const { sync: mkdirp } = require('mkdirp');
const BlinkDiff = require('blink-diff');
const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');

const optionDefinitions = [
	{
		name: 'in',
		alias: 'i',
		type: String,
		description: 'Input folder',
	},
	{
		name: 'out',
		alias: 'o',
		type: String,
		description: 'Output folder',
	},
];

const main = async () => {
	const options = commandLineArgs(optionDefinitions);
	if (!options.in || !options.out) {
		const usage = commandLineUsage([
			{
				header: 'Options',
				optionList: optionDefinitions,
			},
		]);
		console.log(usage);
		process.exit(1);
	}

	const src = resolve(__dirname, options.in);
	const out = resolve(__dirname, options.out);

	const [change, original, diff] = ['change', 'original', 'diff'].map(_ =>
		resolve(out, _)
	);

	[change, original, diff].map(_ => mkdirp(_));
	['change', 'original'].forEach(_ => {
		copydir(resolve(src, _), resolve(out, _));
	});

	const changedFiles = readdirSync(change);

	const output = [];

	for (let file of changedFiles) {
		const bkdiff = new BlinkDiff({
			imageAPath: resolve(original, file),
			imageBPath: resolve(change, file),
			imageOutputPath: resolve(diff, file),
			composition: false,
			thresholdType: BlinkDiff.THRESHOLD_PERCENT,
			threshold: 0.01,
		});
		await new Promise((yay, nay) => {
			bkdiff.run(function(error, result) {
				if (error) {
					nay(error);
				} else {
					console.log(
						bkdiff.hasPassed(result.code)
							? `> ${file} looks about the same`
							: `> ${file} has changes`
					);
					output.push({
						srcset: {
							original: resolve(original, file),
							change: resolve(change, file),
							diff: resolve(diff, file),
						},
						name: file,
						difference: result.differences / result.dimension,
					});
					yay();
				}
			});
		});
	}
	writeFileSync(resolve(out, 'changes.json'), JSON.stringify(output));
};
main();
