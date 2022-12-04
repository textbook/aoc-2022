import { chunk, intersection, sum } from "../utils";

export const solution: Solution = (input) => {
	return sum(chunk(input.split("\n"), 3).map((rucksacks) => {
		const [shared] = intersection(...rucksacks);
		return priority(shared);
	}));
};

const a = 'a'.charCodeAt(0);
const z = 'z'.charCodeAt(0);
const A = 'A'.charCodeAt(0);
const Z = 'Z'.charCodeAt(0);

const priority = (letter: string): number => {
	const code = letter.charCodeAt(0);
	if (a <= code && code <= z) {
		return (code - a) + 1;
	} else if (A <= code && code <= Z) {
		return (code - A) + 27;
	} else {
		throw new Error(`unrecognised letter: ${letter}`);
	}
};
