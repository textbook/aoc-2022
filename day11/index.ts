import { product } from "../utils";

class Monkey {
	private holding: number[];
	private inspected = 0;

	constructor(
		startingItems: number[],
		private inspect: (value: number) => number,
		private evaluate: (value: number) => number,
		private _divisor: number,
	) {
		this.holding = startingItems;
	}

	catchValue(value: number): void {
		this.holding.push(value);
	}

	get divisor(): number {
		return this._divisor;
	}

	get hasItems(): boolean {
		return this.holding.length > 0;
	}

	get itemsInspected(): number {
		return this.inspected;
	}

	throwValue(): { value: number, destination: number } {
		const value = this.inspect(this.holding.shift());
		const destination = this.evaluate(value);
		this.inspected += 1;
		return { destination, value };
	}
}

export const solution: Solution = (input: string): number => {
	const monkeys = parser(input.trim());
	const productOfDivisors = product(monkeys.map((monkey) => monkey.divisor));

	for (let _ = 0; _ < 10_000; _++) {
		monkeys.forEach((monkey) => {
			while (monkey.hasItems) {
				const { destination, value } = monkey.throwValue();
				monkeys[destination].catchValue(value % productOfDivisors);
			}
		});
	}

	return product(monkeys
		.map((monkey) => monkey.itemsInspected)
		.sort((a, b) => b - a)
		.slice(0, 2));
};

export const parser = (input: string): Monkey[] => input
	.split("\n\n")
	.map((monkey): Monkey => {
		const [, items, operation, evaluation, trueDest, falseDest] = monkey.split("\n");
		const [op, right] = operation.slice(23).split(" ");
		const divisor = parseInt(evaluation.slice(21), 10);
		return new Monkey(
			items.slice(18).split(", ").map((value) => parseInt(value, 10)),
			makeInspection(op, right),
			makeEvaluation(
				divisor,
				parseInt(trueDest.slice(29), 10),
				parseInt(falseDest.slice(30), 10),
			),
			divisor,
		);
	});

const makeEvaluation = (divisor: number, trueDest: number, falseDest: number): (value: number) => number => {
	return (value) => value % divisor === 0 ? trueDest : falseDest;
}

const makeInspection = (op: string, right: string): (old: number) => number => {
	if (op === "+") {
		if (right === "old") {
			return (old: number) => old + old;
		} else {
			const number = parseInt(right, 10);
			return (old: number) => old + number;
		}
	} else {
		if (right === "old") {
			return (old: number) => old * old;
		} else {
			const number = parseInt(right, 10);
			return (old: number) => old * number;
		}
	}
}
