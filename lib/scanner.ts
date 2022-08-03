import axios from 'axios';
import { exec } from 'child_process';
import fs from 'fs';
import utils from 'util';
const execute = utils.promisify(exec);

import Jimp from 'jimp';
import { getPlaiceholder } from 'plaiceholder';
import puppeteer from 'puppeteer';

const imageWidth = 240;
const imageHeight = 150;
export interface ImageData {
	href: string;
	favicon: string;
	base64: string;
	src: string;
	width: number;
	height: number;
	type?: string | undefined;
}

/**
 * 	Generates 'mocks/paths.json' file with all links present in each page.
 */
export const generatePaths = async () => {
	execute('npx react-scanner -c react-scanner.config.js');
	console.log('Scanned links.');
};

function timeout(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

const downloadImage = (url: string, image_path: string) =>
	axios({
		url,
		responseType: 'stream',
	}).then(
		response =>
			new Promise<void>((resolve, reject) => {
				response.data
					.pipe(fs.createWriteStream(image_path))
					.on('finish', () => resolve())
					.on('error', () => reject());
			}),
	);

interface FaviconEntry {
	url: string,
	extension: string,
	size: number
}

/**
 *  Screenshots every link in 'mocks/paths.json' and saves it to 'mocks/previews' directory as png's.
 */
// TODO: Add a tab threshold to the function.
export const generatePreviews = async () => {
	const { links }: { links: string[] } = JSON.parse(fs.readFileSync('mocks/paths.json').toString());

	const browser = await puppeteer.launch({
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	});

	const preview = (link: string) => browser.newPage().then(async page => {
		await page.emulateMediaFeatures([
			{
				name: 'prefers-color-scheme',
				value: 'dark'
			}
		]);
		await page.setViewport({
			width: imageWidth * 4,
			height: imageHeight * 4
		});

		try {
			await page.goto(link, { waitUntil: 'load', timeout: 0 });
			console.log('Screenshotting ' + page.url());
			await timeout(2500);
			await page.screenshot({ path: `./public/assets/previews/${link.replaceAll("/", "@")}.png` });

			await page.close();
		} catch (err) {
			console.log(err);
		}
	});

	const favicon = async (link: string) => {
		try {
			const favicons: FaviconEntry[] = await axios.get(`http://grab-favicons.herokuapp.com/api/v1/grab-favicons?url=${new URL(link).hostname}`).then(res => res.data);
			let bestFavicon: FaviconEntry = favicons[0];
			favicons.forEach(favicon => {
				if (!bestFavicon || bestFavicon.extension !== 'ico')
					bestFavicon = favicon;
				else if (favicon.extension === 'ico' && bestFavicon.size < favicon.size)
					bestFavicon = favicon;
			})

			console.log('Downloading ' + bestFavicon.url);
			await downloadImage(bestFavicon.url, `./public/assets/previews/${link.replaceAll("/", "@")}-favicon.${bestFavicon.extension}`);

			return bestFavicon.url;
			// eslint-disable-next-line no-empty
		} catch (ignored) { }
	};

	await Promise.all([...links.map(preview), ...links.map(favicon)]);

	await browser.close();
}

/**
 * 	Creates the typed JSON file 'mocks/links.json' with all links present in each page.
 * 
 * 	Favicons are a pain because there is no one-fits-all API that pulls them.
 * 	So the workaround here is to fallback between several APIs or a mix of 
 */

export const generateData = async () => {
	const data: ImageData[] = [];

	const { links }: { links: string[] } = JSON.parse(fs.readFileSync('mocks/paths.json').toString());
	const promises = links.map(async (link) => {
		const { base64, img } = await getPlaiceholder(`/assets/previews/${link.replaceAll("/", "@")}.png`);

		const hostname = new URL(link).hostname;
		const yandexImage = await Jimp.read(`https://favicon.yandex.net/favicon/${hostname}`);
		const promises = Array.from(Array(15).keys()).map(async pixel => {
			const { r, g, b } = Jimp.intToRGBA(yandexImage.getPixelColor(pixel, 7));
			console.log((r === 230) && (g === 230) && (b === 230));
			return (r === 230) && (g === 230) && (b === 230);
		});
		await Promise.all(promises);
		const isYandex = !promises.every(pixel => pixel);
		console.log(`${link} is ${isYandex}`)

		const path = `/assets/previews/${link.replaceAll("/", "@")}`;
		const hasFaviconIco = fs.existsSync(`public${path}-favicon.ico`);
		const hasFaviconPng = fs.existsSync(`public${path}-favicon.png`);
		const favicon: string = isYandex ? `https://favicon.yandex.net/favicon/${hostname}` :
			hasFaviconIco ? `${path}-favicon.ico` :
				hasFaviconPng ? `${path}-favicon.png` : '';

		data.push({
			href: link,
			favicon,
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