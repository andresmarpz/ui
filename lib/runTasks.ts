import { generateData, generatePreviews, scanLinks } from "./scanner";

export default async function run() {
	await scanLinks();
	await generatePreviews();
	await generateData();
}

run();