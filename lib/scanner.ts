import { exec } from 'child_process';
import fs from 'fs';
import utils from 'util';
const execute = utils.promisify(exec);

import { getPlaiceholder } from 'plaiceholder';
import puppeteer from 'puppeteer';

const imageWidth = 240;
const imageHeight = 150;

export interface ImageData {
	href: string;
	base64: string;
	src: string;
	width: number;
	height: number;
	type?: string | undefined;
}

/**
 * 	Generates 'mocks/paths.json' file with all links present in each page.
 */
export const scanLinks = async () => {
	execute('npx react-scanner -c react-scanner.config.js');
	console.log('Scanned links.');
};

function timeout(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 *  Screenshots every link in 'mocks/paths.json' and saves it to 'mocks/previews' directory as png's.
 */
export const generatePreviews = async () => {
	const { links }: { links: string[] } = JSON.parse(fs.readFileSync('mocks/paths.json').toString());

	const browser = await puppeteer.launch({
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	});
	const page = await browser.newPage();
	await page.setViewport({
		width: imageWidth * 4,
		height: imageHeight * 4
	});

	for (const link of links) {
		await page.goto(link, { waitUntil: 'load', timeout: 0 });
		await page.emulateMediaFeatures([
			{
				name: 'prefers-color-scheme',
				value: 'dark'
			}
		]);
		console.log('Screenshotting ' + page.url());
		await timeout(2500);
		await page.screenshot({ path: `./public/assets/previews/${link.replaceAll("/", "@")}.png` });
	}

	await browser.close();
}

/**
 * 	Creates the typed JSON file 'mocks/links.json' with all links present in each page.
 */

export const generateData = async () => {
	const data: ImageData[] = [];

	const { links }: { links: string[] } = JSON.parse(fs.readFileSync('mocks/paths.json').toString());
	const promises = links.map(async (link) => {
		const { base64, img } = await getPlaiceholder(`/assets/previews/${link.replaceAll("/", "@")}.png`);

		data.push({
			href: link,
			base64,
			...img
		});
	})

	await Promise.all(promises);

	fs.writeFileSync('mocks/links.json', JSON.stringify(data, null, 4));
}

/**
 * 	Returns a list of ImageData with information about each image preview.
 * 	@returns {ImageData[]} where each ImageData contains all the data about the image
 * 	such as href, base64, src, width, height, type.
 */
export const getLinkPreviews: () => ImageData[] = () => JSON.parse(fs.readFileSync('mocks/links.json').toString());