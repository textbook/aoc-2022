class Monkey {
	private holding: number[];
	private inspected = 0;

	constructor(
		startingItems: number[],
		private inspect: (value: number) => number,
		private evaluate: (value: number) => number,
	) {
		this.holding = startingItems;
	}

	catchValue(value: number): void {
		this.holding.push(value);
	}

	get hasItems(): boolean {
		return this.holding.length > 0;
	}

	get itemsInspected(): number {
		return this.inspected;
	}

	throwValue(): { value: number, destination: number } {
		const value = Math.floor(this.inspect(this.holding.shift()) / 3);
		const destination = this.evaluate(value);
		this.inspected += 1;
		return { destination, value };
	}
}

export const solution: Solution = (input: string): number => {
	const monkeys = parser(input.trim());
	for (let _ = 0; _ < 20; _++) {
		monkeys.forEach((monkey) => {
			while (monkey.hasItems) {
				const { destination, value } = monkey.throwValue();
				monkeys[destination].catchValue(value);
			}
		});
	}
	const [first, second] = monkeys
		.map((monkey) => monkey.itemsInspected)
		.sort((a, b) => b - a);
	return first * second;
};

export const parser = (input: string): Monkey[] => input
	.split("\n\n")
	.map((monkey): Monkey => {
		const [, items, operation, evaluation, trueDest, falseDest] = monkey.split("\n");
		const [op, right] = operation.slice(23).split(" ");
		return new Monkey(
			items.slice(18).split(", ").map((value) => parseInt(value, 10)),
			makeInspection(op, right),
			makeEvaluation(
				parseInt(evaluation.slice(21), 10),
				parseInt(trueDest.slice(29), 10),
				parseInt(falseDest.slice(30), 10),
			)
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
