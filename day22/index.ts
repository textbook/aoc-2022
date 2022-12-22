import { sum } from "../utils";

const enum Direction {
	LEFT = "L",
	RIGHT = "R",
}

const enum Facing {
	EAST = "E",
	NORTH = "N",
	SOUTH = "S",
	WEST = "W",
}

type Position = [number, number];

const enum Tile {
	OPEN = ".",
	WALL = "#",
	EMPTY = " "
}

export const solution: Solution = (input): number => {
	const { map, path } = parser(input);
	let position: Position = [map[0].indexOf(Tile.OPEN), 0];
	let facing: Facing = Facing.EAST;
	path.forEach((step) => {
		if ("direction" in step) {
			facing = ROTATION[step.direction][facing];
			return;
		}
		const { distance } = step;
		for (let _ = 0; _ < distance; _++) {
			const [x, y] = wrapped(position, facing, map);
			if (map[y][x] === Tile.WALL) {
				break;
			}
			position = [x, y];
		}
	});
	return score(position, facing);
};

const inBounds = (value: number): boolean => value !== -1;

const score = ([column, row]: Position, facing: Facing): number => {
	const FACING_SCORES: Record<Facing, number> = {
		[Facing.EAST]: 0,
		[Facing.NORTH]: 3,
		[Facing.SOUTH]: 1,
		[Facing.WEST]: 2,
	};
	return sum([1_000 * (row + 1), 4 * (column + 1), FACING_SCORES[facing]]);
};

const wrapped = (position: Position, facing: Facing, map: Tile[][]): Position => {
	const [dx, dy] = MOVES[facing];
	let [x, y] = [position[0] + dx, position[1] + dy];
	if (map[y]?.[x] === undefined || map[y][x] === Tile.EMPTY) {
		const column = map.map((row) => row[x]);
		const row = map[y];
		switch (facing) {
			case Facing.EAST:
				x = Math.min(...[row.indexOf(Tile.OPEN), row.indexOf(Tile.WALL)].filter(inBounds));
				break;
			case Facing.NORTH:
				y = Math.max(...[column.lastIndexOf(Tile.OPEN), column.lastIndexOf(Tile.WALL)].filter(inBounds));
				break;
			case Facing.SOUTH:
				y = Math.min(...[column.indexOf(Tile.OPEN), column.indexOf(Tile.WALL)].filter(inBounds));
				break;
			case Facing.WEST:
				x = Math.max(...[row.lastIndexOf(Tile.OPEN), row.lastIndexOf(Tile.WALL)].filter(inBounds));
				break;
		}
	}
	return [x, y];
};

const ROTATION: Record<Direction, Record<Facing, Facing>> = {
	L: {
		[Facing.EAST]: Facing.NORTH,
		[Facing.NORTH]: Facing.WEST,
		[Facing.SOUTH]: Facing.EAST,
		[Facing.WEST]: Facing.SOUTH,
	},
	R: {
		[Facing.EAST]: Facing.SOUTH,
		[Facing.NORTH]: Facing.EAST,
		[Facing.SOUTH]: Facing.WEST,
		[Facing.WEST]: Facing.NORTH,
	},
}

const MOVES: Record<Facing, [number, number]> = {
	[Facing.EAST]: [1, 0],
	[Facing.NORTH]: [0, -1],
	[Facing.SOUTH]: [0, 1],
	[Facing.WEST]: [-1, 0],
};

interface Rotate {
	direction: Direction;
}

interface Move {
	distance: number;
}

type Step = Move | Rotate;

export const parser: Parser<{ map: Tile[][], path: Step[] }> = (input) => {
	const [tiles, steps] = input.split("\n\n");
	const rows = tiles.split("\n");
	const maxWidth = Math.max(...rows.map((row) => row.length));

	const map = rows.map((row) => [...Array(maxWidth)].map((_, index) => {
		return row[index] === undefined ? Tile.EMPTY : row[index] as Tile;
	}));

	const path: Step[] = steps.match(/(\d+|[LR])/g).map((value) => {
		return value.match(/\d+/)
			? { distance: parseInt(value, 10) }
			: { direction: value as Direction };
	});
	return { map, path };
}
