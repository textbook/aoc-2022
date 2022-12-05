export interface Move {
	count: number;
	destination: number;
	source: number;
}

export const solution: Solution = (input): string => {
	const [stacks, moves] = parser(input);

	for (const { count, destination, source } of moves) {
		for (let i = 0; i < count; i++) {
			stacks[destination].push(stacks[source].pop());
		}
	}

	return stacks.slice(1).map((stack) => stack[stack.length - 1]).join("");
};

export const parser = (input: string): [string[][], Move[]] => {
	const [crates, moves] = input.split("\n\n");
	return [
		createStacks(crates),
		moves.split("\n").map((move) => {
			const words = move.split(" ");
			return {
				count: parseInt(words[1], 10),
				destination: parseInt(words[5], 10),
				source: parseInt(words[3], 10),
			};
		}),
	];
};

const createStacks = (crates: string): string[][] => {
	const map = [undefined];
	let stack = 1;
	for (const crate of crates.match(/(\[\w]|\s{3})\s/gm) ?? []) {
		if (map[stack] === undefined) {
			map.push([]);
		}
		if (crate.startsWith("[")) {
			map[stack].splice(0, 0, crate[1]);
		}
		stack += 1;
		if (crate.endsWith("\n")) {
			stack = 1;
		}
	}
	return map;
};
