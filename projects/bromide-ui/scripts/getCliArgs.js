#!/usr/bin/env node
const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');
const { resolve, dirname } = require('path');
const { readFileSync, writeFileSync, copyFileSync } = require('fs');
const download = require('download');
const mkdirp = require('mkdirp');
const optionDefinitions = [
	{
		name: 'changes',
		alias: 'c',
		type: String,
		description: 'Path to your changes.json',
	},
	{
		name: 'out',
		alias: 'o',
		type: String,
		description: 'Output folder',
	},
	{
		name: 'skip-downloads',
		type: Boolean,
		description: 'Skip downloading images locally (useful in dev)',
	},
	{
		name: 'thresholds',
		alias: 't',
		type: String,
		defaultValue: resolve(
			__dirname,
			'..',
			'..',
			'..',
			'sample',
			'thresholds.json'
		),
		description: 'Path to your thresholds.json (optional)',
	},
];

const getPath = file => {
	if (file[0] === '/') return file;
	else return resolve(process.cwd(), file);
};

const parseJson = file => {
	try {
		return JSON.stringify(JSON.parse(readFileSync(file)));
	} catch (e) {
		console.error(`could not parse ${file}`);
		process.exit(1);
	}
};

const filename = image => Buffer.from(image).toString('base64') + '.png';

const downloadImages = async (json, pathToJson) => {
	const imageCachePath = resolve(__dirname, '..', 'public', '.imagecache');
	mkdirp(imageCachePath);
	for (let { srcset, name } of JSON.parse(json)) {
		console.log(`downloading ${name} to ${imageCachePath}`);
		await Promise.all(
			['original', 'change', 'diff'].map(image =>
				srcset[image].includes('://')
					? download(srcset[image]).then(data => {
							writeFileSync(
								resolve(imageCachePath, filename(srcset[image])),
								data
							);
					  })
					: copyFileSync(
							resolve(dirname(pathToJson), srcset[image]),
							resolve(imageCachePath, filename(srcset[image]))
					  )
			)
		);
		console.log(`...done`);
	}
	return json;
};

module.exports = async () => {
	const options = commandLineArgs(optionDefinitions);
	if (!options.changes || !options.out) {
		const usage = commandLineUsage([
			{
				header: 'Options',
				optionList: optionDefinitions,
			},
		]);
		console.log(usage);
		process.exit(1);
	} else {
		return {
			out: getPath(options.out),
			changes: options['skip-downloads']
				? parseJson(getPath(options.changes))
				: await downloadImages(
						parseJson(getPath(options.changes)),
						getPath(options.changes)
				  ),
			thresholds: parseJson(getPath(options.thresholds)),
		};
	}
};
