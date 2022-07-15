/* eslint-disable @typescript-eslint/no-var-requires */

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const puppeteer = require('puppeteer');

const items = [];

const imageWidth = 240;
const imageHeight = 150;

const scanLinks = async () => {
    await exec('npx react-scanner -c react-scanner.config.js');
    console.log('Scanned links.');

    const links = JSON.parse(fs.readFileSync('mocks/links.json').toString());
    const entries = links['LinkPreview']['instances'];

    entries.forEach((entry) => {
        let url = entry['props']['href'];
        items.push([
            url,
            './public/assets/previews/' + url.replaceAll('/', '@') + '.png'
        ]);
    });
};

function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const fetchPreviews = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: imageWidth * 4,
        height: imageHeight * 4
    });

    while (items.length > 0) {
        const [url, filename] = items.pop();
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
    }

    await browser.close();
};

const run = async () => {
    await scanLinks();
    await fetchPreviews();
};

run();
