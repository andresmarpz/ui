import { generateData, generatePaths, generatePreviews } from "./scanner";

export default async function run() {
	await generatePaths();
	await generatePreviews();
	await generateData();
}

run();