type Position = [number, number];
type Direction = "D" | "L" | "R" | "U";

export const solution: Solution = (input: string): number => {
	const visited = new Set<string>();
	let head: Position = [0, 0], tail: Position = [0, 0];
	input.trim().split("\n").forEach((instruction) => {
		const [direction, distance] = instruction.split(" ");
		if (!["D", "L", "R", "U"].includes(direction)) {
			throw new Error(`unknown direction: ${direction}`);
		}
		[head, tail] = simulate(head, tail, direction as Direction, parseInt(distance, 10), visited);
	});
	return visited.size;
};

const MOVES: Record<Direction, Position> = {
	D: [0, 1],
	L: [-1, 0],
	R: [1, 0],
	U: [0, -1],
};

const simulate = (
	[xh, yh]: Position,
	[xt, yt]: Position,
	direction: Direction,
	distance: number,
	visited: Set<string>,
): [head: Position, tail: Position] => {
	const [dx, dy] = MOVES[direction];
	for (let _ = 0; _ < distance; _++) {
		[xh, yh] = [xh + dx, yh + dy];
		[xt, yt] = catchUp([xh, yh], [xt, yt]);
		visited.add(`${xt},${yt}`);
	}
	return [[xh, yh], [xt, yt]];
};

const catchUp = ([xh, yh]: Position, [xt, yt]: Position): Position => {
	const dx = xh - xt, dy = yh - yt;
	if (Math.abs(dx) <= 1 && Math.abs(dy) <= 1) {
		return [xt, yt];
	}
	if (dx === 0) {
		return [xt, yt + (dy / 2)];
	}
	if (dy === 0) {
		return [xt + (dx / 2), yt];
	}
	return [xt + (dx > 0 ? 1 : -1), yt + (dy > 0 ? 1 : -1)];
};
