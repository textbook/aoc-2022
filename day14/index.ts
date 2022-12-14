type Point = [number, number];

const MOVES = [[0, 1], [-1, 1], [1, 1]] as const;

export const solution: Solution = (input: string): number => {
	const occupiedTiles = parser(input);
	const rockTiles = occupiedTiles.size;
	const lastRow = Math.max(...[...occupiedTiles].map(fromString).map(([, y]) => y));
	settling: while (true) {
		let [x, y]: [number, number] = [500, 0];
		while (true) {
			const validMove = MOVES.find(([dx, dy]) => !occupiedTiles.has([x + dx, y + dy].toString()));
			if (!validMove) {
				occupiedTiles.add([x, y].toString());
				break;
			}
			const [dx, dy] = validMove;
			[x, y] = [x + dx, y + dy];
			if (y === lastRow) {
				break settling;
			}
		}
	}
	return occupiedTiles.size - rockTiles;
};

const fromString = (point: string): Point => {
	const [x, y] = point.split(",");
	return [parseInt(x, 10), parseInt(y, 10)];
};

export const parser = (input: string): Set<string> => new Set(input
	.trim()
	.split("\n")
	.flatMap((path): string[] => {
		const points: Point[] = path.split(" -> ").map(fromString);
		const tiles: string[] = [];
		for (let index = 0; index < points.length - 1; index++) {
			const [[from_x, from_y], [to_x, to_y]] = points.slice(index, index + 2);
			if (from_x === to_x) {
				for (let y = Math.min(from_y, to_y); y <= Math.max(from_y, to_y); y++) {
					tiles.push([from_x, y].toString());
				}
			} else if (from_y === to_y) {
				for (let x = Math.min(from_x, to_x); x <= Math.max(from_x, to_x); x++) {
					tiles.push([x, from_y].toString());
				}
			} else {
				throw new Error(`can't plot from ${[from_x, from_y]} to ${[to_x, to_y]}`);
			}
		}
		return tiles;
	}));
