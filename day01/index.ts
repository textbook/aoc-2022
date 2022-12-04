import { sum } from "../utils";

export const solution: Solution = (input: string): number => {
	const data = input
		.split("\n\n")
		.map((section) => section
			.split("\n")
			.map((line) => parseInt(line)));
	return core(data);
};

const core = (values: number[][]): number => {
	return sum(values.map(sum).sort((a, b) => b - a).slice(0, 3));
};
