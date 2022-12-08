
export const solution: Solution = (input: string): number => {
	const forest = input
		.trim()
		.split("\n")
		.map((row) => row
			.split("")
			.map((tree) => parseInt(tree, 10)));

	return visibleTrees(forest).size;
};
const visibleTrees = (forest: number[][]): Set<string> => {
	const visible = new Set<string>();
	let highest: number;
	for (let y = 0; y < forest.length; y++) {
		const row = forest.at(y);

		highest = -1;
		for (let x = 0; x < row.length; x++) {
			const tree = row.at(x);
			if (tree > highest) {
				visible.add(`${x},${y}`);
				highest = tree;
				if (tree === 9) {
					break;
				}
			}
		}

		highest = -1;
		for (let dx = -1; dx > -1 - row.length; dx--) {
			const tree = row.at(dx);
			if (tree > highest) {
				visible.add(`${row.length + dx},${y}`);
				highest = tree;
				if (tree === 9) {
					break;
				}
			}
		}
	}

	for (let x = 0; x < forest[0].length; x++) {
		highest = -1;
		for (let y = 0; y < forest.length; y++) {
			const tree = forest.at(y).at(x);
			if (tree > highest) {
				visible.add(`${x},${y}`);
				highest = tree;
				if (tree === 9) {
					break;
				}
			}
		}

		highest = -1;
		for (let dy = -1; dy > -1 - forest.length; dy--) {
			const tree = forest.at(dy).at(x);
			if (tree > highest) {
				visible.add(`${x},${forest[0].length + dy}`);
				highest = tree;
				if (tree === 9) {
					break;
				}
			}
		}
	}
	return visible;
};
