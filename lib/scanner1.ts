/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const plaiceholder = require('plaiceholder');

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const puppeteer = require('puppeteer');

type Item = [url: string, filename: string];

export interface ImageData {
	href: string;
	base64: string;
	src: string;
	width: number;
	height: number;
	type?: string | undefined;
}

const items: Item[] = [];

const imageWidth = 240;
const imageHeight = 150;

const scanLinks = async () => {
	await exec('npx react-scanner -c react-scanner.config.js');
	console.log('Scanned links.');

	const links = JSON.parse(fs.readFileSync('mocks/links.json').toString());
	const entries = links['LinkPreview']['instances'];

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	entries.forEach((entry: any) => {
		const url: string = entry['props']['href'];
		items.push([
			url,
			'./public/assets/previews/' + url.replaceAll('/', '@') + '.png'
		]);
	});
};

function timeout(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

const fetchPreviews = async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setViewport({
		width: imageWidth * 4,
		height: imageHeight * 4
	});

	items.forEach(async (item) => {
		const [url, filename] = item;
		await page.goto(url, { waitUntil: 'load', timeout: 0 });
		await page.emulateMediaFeatures([
			{
				name: 'prefers-color-scheme',
				value: 'dark'
			}
		]);
		console.log('Screenshotting ' + page.url());
		await timeout(4000);
		await page.screenshot({ path: filename });
	})

	await browser.close();
};


const generateData = async () => {
	const base64images: ImageData[] = [];
	const previewsDirectory = path.join(
		process.cwd(),
		'/public/assets/previews'
	);
	const filenames = await fs.readdir(previewsDirectory);
	const previews = filenames.map(async (filename: string) => {
		const { base64, img } = await plaiceholder.getPlaiceholder(
			'/assets/previews/' + filename
		);
		base64images.push({
			href: filename
				.replaceAll('@', '/')
				.substring(0, filename.length - 4),
			base64,
			...img
		});
	});
	await Promise.all(previews);

	fs.writeFileSync('mocks/links.json', JSON.stringify(base64images));
};

async () => {
	await scanLinks();
	await fetchPreviews();
	await generateData();
};
