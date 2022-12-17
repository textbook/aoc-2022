type Position = [number, number];

const enum Jet {
	LEFT = -1,
	RIGHT = 1
}

const rocks: Position[][] = [
	[[0, 0], [1, 0], [2, 0], [3, 0]],
	[[1, 2], [0, 1], [1, 1], [2, 1], [1, 0]],
	[[2, 2], [2, 1], [0, 0], [1, 0], [2, 0]],
	[[0, 3], [0, 2], [0, 1], [0, 0]],
	[[0, 1], [1, 1], [0, 0], [1, 0]],
];

export const solution = (input: string): number => {
	const occupied: Set<string> = new Set(["0,0", "1,0", "2,0", "3,0", "4,0", "5,0", "6,0"]);
	const jets = parser(input);
	let peak = 0;
	let jetIndex = 0;
	for (let rockIndex = 0; rockIndex < 2_022; rockIndex++) {
		const rock = rocks[rockIndex % rocks.length];
		let position: Position = [2, peak + 4];
		while (true) {
			// Horizontal movement
			const jet = jets[jetIndex % jets.length];
			jetIndex++;
			if (validMove(rock, position, [jet, 0], occupied)) {
				position = [position[0] + jet, position[1]];
			}

			// Vertical movement
			if (!validMove(rock, position, [0, -1], occupied)) {
				const top = Math.max(...rock.map(([, dy]) => position[1] + dy));
				if (top > peak) {
					peak = top;
				}
				rock.forEach(([dx, dy]) => occupied.add(`${position[0] + dx},${position[1] + dy}`));
				break;
			}
			position = [position[0], position[1] - 1];
		}
	}
	return peak;
};

const validMove = (rock: Position[], [x, y]: Position, [dx, dy]: Position, occupied: Set<string>): boolean => {
	const newPositions = rock.map((offset) => [offset[0] + x + dx, offset[1] + y + dy]);
	const horizontalPositions = newPositions.map(([x]) => x);
	if (Math.min(...newPositions.map(([x]) => x)) < 0) {
		return false;
	}
	if (Math.max(...horizontalPositions) > 6) {
		return false;
	}
	return !newPositions.some((offset) => occupied.has(offset.toString()));

};

const parser: Parser<Jet[]> = (input) => [...input.trim()].map((char) => char === "<" ? Jet.LEFT : Jet.RIGHT);
