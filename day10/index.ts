import { sum } from "../utils";

const MEASURED = [...new Array(6)].map((_, index) => 20 + (40 * index));

export const solution: Solution = (input: string): number => {
	let X = 1;
	const signalStrengths: number[] = [];
	const instructions = parse(input);

	for (let cycle = 1; cycle <= 220; cycle++) {
		if (MEASURED.includes(cycle)) {
			signalStrengths.push(cycle * X);
		}
		const instruction = instructions.shift();
		if (instruction.name === "addx") {
			cycle++;
			if (MEASURED.includes(cycle)) {
				signalStrengths.push(cycle * X);
			}
			X += instruction.value;
		}
	}

	return sum(signalStrengths);
};

type AddX = { name: "addx", value: number };
type NoOp = { name: "noop" };
type Instruction = AddX | NoOp;

const parse = (input: string): Instruction[] => input
	.trim()
	.split("\n")
	.map((line) => {
		const [name, value] = line.split(" ");
		switch (name) {
			case "noop":
				return { name };
			case "addx":
				return { name, value: parseInt(value, 10) };
			default:
				throw new Error(`unknown instruction ${name}`);
		}
	});
