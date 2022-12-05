import { sum } from "../utils";

import { Outcome, rps, Shape } from "./rps";

export const solution: Solution = (input: string): number => {
	return sum(input.trim().split("\n").map((round) => {
		const [opponent, outcome] = round.split(" ").map(convert) as [Shape, Outcome];
		for (const shape of [Shape.ROCK, Shape.PAPER, Shape.SCISSORS]) {
			if (rps(opponent, shape) === outcome) {
				return shape + outcome;
			}
		}
	}));
};

function convert(letter: "A" | "B" | "C"): Shape;
function convert(letter: "X" | "Y" | "Z"): Outcome;
function convert(letter: string): Outcome | Shape {
	switch(letter) {
		case "A":
			return Shape.ROCK;
		case "B":
			return Shape.PAPER;
		case "C":
			return Shape.SCISSORS;
		case "X":
			return Outcome.LOSS;
		case "Y":
			return Outcome.DRAW;
		case "Z":
			return Outcome.WIN;
		default:
			throw new Error(`unrecognised letter: ${letter}`);
	}
}
