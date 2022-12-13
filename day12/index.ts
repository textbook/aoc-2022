type Terrain = number[][];
type Position = [number, number];

export const solution: Solution = (input: string): number => {
	const { start, end, terrain } = parser(input);
	const elevation = terrain[start[1]][start[0]];
	const starts = terrain
		.flatMap((row, y) => row
			.map((cell, x): Position => [x, y])
			.filter(([x, y]) => terrain[y][x] === elevation));
	const path = findPath(terrain, starts, end);
	return path.length - 1;
};

const findPath = (terrain: Terrain, starts: Position[], end: Position): string[] => {
	let paths: string[][] = starts.map((start) => [start.toString()]);
	while (true) {
		paths = paths
			.flatMap((path) => validMoves(fromString(path.at(-1)), terrain)
				.map((position) => position.toString())
				.filter((position) => !path.includes(position))
				.map((position) => [...path, position]));
		paths = Object.values(Object.fromEntries(paths.map((path) => [path.at(-1), path])));
		for (const path of paths) {
			const [x, y] = fromString(path.at(-1));
			if (x === end[0] && y === end[1]) {
				return path;
			}
		}
	}
};

const fromString = (saved: string): Position => {
	const [x, y] = saved.split(",");
	return [parseInt(x, 10), parseInt(y, 10)];
}

const MOVES = [[0, 1], [0, -1], [1, 0], [-1, 0]];

const validMoves = ([x, y]: Position, terrain: Terrain): Position[] => MOVES
	.map(([dx, dy]): Position => [x + dx, y + dy])
	.filter(([new_x, new_y]) => terrain?.[new_y]?.[new_x] <= (terrain[y][x] + 1));

const a = "a".charCodeAt(0);

export const parser = (input: string): { terrain: Terrain, start: Position, end: Position } => {
	let start, end;
	const terrain = input
		.trim()
		.split("\n")
		.map((row, y) => row
			.split("")
			.map((cell, x) => {
				if (cell === "S") {
					start = [x, y];
					cell = "a";
				} else if (cell === "E") {
					end = [x, y];
					cell = "z";
				}
				return cell.charCodeAt(0) - a;
			}));
	return { end, start, terrain };
};
