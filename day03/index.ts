import { sum } from "../utils";

export const solution: Solution = (input) => {
	return sum(input.split("\n").map((rucksack) => {
		const firstCompartment = rucksack.slice(0, rucksack.length / 2);
		const secondCompartment = rucksack.slice(rucksack.length / 2);
		const [shared] = [...new Set(firstCompartment)].filter((item) => secondCompartment.includes(item));
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
