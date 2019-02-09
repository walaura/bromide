#!/usr/bin/env node
const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');
const { resolve } = require('path');
const { readFileSync } = require('fs');
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
		name: 'thresholds',
		alias: 't',
		type: String,
		defaultValue: resolve(__dirname, '..', 'sample', 'thresholds.json'),
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

module.exports = () => {
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
			changes: parseJson(getPath(options.changes)),
			thresholds: parseJson(getPath(options.thresholds)),
		};
	}
};
