
export const solution: Solution = (input: string): number => {
	const forest = input
		.trim()
		.split("\n")
		.map((row) => row
			.split("")
			.map((tree) => parseInt(tree, 10)));

	return Math.max(...scenicScores(forest));
};

const scenicScores = (forest: number[][]): number[] => forest
	.flatMap((row, y) => row
		.map((tree, x) => scenicScore(forest, tree, [x, y])));

const scenicScore = (forest: number[][], tree: number, [x, y]: [number, number]): number => {
	let left = 0;
	for (let dx = -1; x + dx >= 0; dx--) {
		left += 1;
		if (forest[y][x + dx] >= tree) {
			break;
		}
	}

	let right = 0;
	for (let dx = 1; x + dx < forest[y].length; dx++) {
		right += 1;
		if (forest[y][x + dx] >= tree) {
			break;
		}
	}

	let up = 0;
	for (let dy = -1; y + dy >= 0; dy--) {
		up += 1;
		if (forest[y + dy][x] >= tree) {
			break;
		}
	}

	let down = 0;
	for (let dy = 1; y + dy < forest.length; dy++) {
		down += 1;
		if (forest[y + dy][x] >= tree) {
			break;
		}
	}

	return up * down * left * right;
};
