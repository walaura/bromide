const { resolve, dirname } = require('path');
const { writeFileSync, copyFileSync } = require('fs');
const { sync: rimraf } = require('rimraf');
const download = require('download');
const { sync: mkdirp } = require('mkdirp');
const paths = require('../config/paths');
const chalk = require('chalk');

const filename = image => Buffer.from(image).toString('base64') + '.png';

const downloadImages = async (json, pathToJson) => {
	const imageCachePath = paths.screenshotsFinal;
	rimraf(imageCachePath);
	mkdirp(imageCachePath);
	console.log(chalk.blue(`Downloading ${JSON.parse(json).length} images`));
	for (let { srcset, name } of JSON.parse(json)) {
		console.log(`> downloading ${name} to ${imageCachePath}`);
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
		console.log(`  ...done`);
	}
	return json;
};

module.exports = downloadImages;
