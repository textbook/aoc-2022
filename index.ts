import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const [, , day] = process.argv;

const __dirname = dirname(fileURLToPath(import.meta.url));
const directory = `day${day.padStart(2, "0")}`;

const { solution } = await import(join(__dirname, directory, "index.js"));
const data = await readFile(join(__dirname, directory, "input.txt"), "utf8");

try {
	const result = solution(data);
	console.log(result);
} catch (err) {
	console.error(err);
	process.exit(1);
}
