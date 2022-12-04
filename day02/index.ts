import { sum } from "../utils";

import { rps, Shape } from "./rps";

export const solution = (input: string): number => {
	return sum(input.split("\n").map((round) => {
		const [opponent, you] = round.split(" ").map(convert);
		return rps(opponent, you) + you;
	}));
};

function convert(letter: string): Shape {
	switch(letter) {
		case "A":
		case "X":
			return Shape.ROCK;
		case "B":
		case "Y":
			return Shape.PAPER;
		case "C":
		case "Z":
			return Shape.SCISSORS;
		default:
			throw new Error(`unrecognised letter: ${letter}`);
	}
}
