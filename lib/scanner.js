// import fs from 'node:fs';

// import captureWebsite from 'capture-website';

// const items = [];

// const options = {
//     width: 1280,
//     height: 720,
//     darkMode: true,
//     overwrite: true,
//     timeout: 30,

//     beforeScreenshot: async (page, browser) => {
//         await page.setDefaultNavigationTimeout(0);
//         console.log('Screenshotting ' + page.url());
//     },
//     userAgent:
//         'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
// };

// const scanLinks = async () => {
//     const links = JSON.parse(fs.readFileSync('mocks/links.json').toString());
//     const entries = links['links'];
//     entries.forEach((entry) =>
//         items.push([
//             entry,
//             `./public/assets/previews/${filenamifyUrl(entry)}.png`
//         ])
//     );
// };

// const fetchPreviews = async () => {
//     await Promise.all(
//         items.map(([url, filename]) => {
//             return captureWebsite.file(url, filename, options);
//         })
//     );
// };

// async function run() {
//     await scanLinks();
//     await fetchPreviews();
// }

// run();

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const puppeteer = require('puppeteer');

const items = [];

const scanLinks = async () => {
    await exec('npx react-scanner -c react-scanner.config.js');
    console.log('Scanned links.');

    const links = JSON.parse(fs.readFileSync('mocks/links.json').toString());
    const entries = links['LinkPreview']['instances'];

    // const module = await import('filenamify-url');

    entries.forEach((entry) => {
        let url = entry['props']['href'];
        items.push([
            url,
            // `./public/assets/previews/${module.default(url)}.png`,
            './public/assets/previews/' +
                url
                    .substring(url.indexOf('/') + 2, url.length)
                    .replaceAll('/', '!') +
                '.png'
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
        width: 1280,
        height: 960
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
