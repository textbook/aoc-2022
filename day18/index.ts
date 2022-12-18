type Point = [number, number, number];

const ADJACENT: Point[] = [
	[-1,  0,  0],
	[ 1,  0,  0],
	[ 0, -1,  0],
	[ 0,  1,  0],
	[ 0,  0, -1],
	[ 0,  0,  1],
];

export const solution: Solution = (input): number => {
	const points = input.trim().split("\n").map(fromString);
	const steam = fill(points);
	let exposed = 0;

	points.forEach(([x, y, z]) => {
		ADJACENT.forEach(([dx, dy, dz]) => {
			if (steam.has(`${x + dx},${y + dy},${z + dz}`)) {
				exposed++;
			}
		});
	});

	return exposed;
};

function fill(points: Point[]) {
	const minX = Math.min(...points.map(([x]) => x));
	const maxX = Math.max(...points.map(([x]) => x));
	const minY = Math.min(...points.map(([, y]) => y));
	const maxY = Math.max(...points.map(([, y]) => y));
	const minZ = Math.min(...points.map(([, , z]) => z));
	const maxZ = Math.max(...points.map(([, , z]) => z));

	const inBounds = ([x, y, z]: Point): boolean => x >= minX - 1 && x <= maxX + 1
		&& y >= minY - 1 && y <= maxY + 1
		&& z >= minZ - 1 && z <= maxZ + 1;

	const obsidian = new Set(points.map((point) => point.toString()));
	let frontier: Set<string> = new Set([[minX - 1, minY - 1, minZ - 1].toString()]);
	const steam = new Set<string>();

	while (frontier.size > 0) {
		frontier = [...frontier]
			.map(fromString)
			.reduce((newFrontier, [x, y, z]) => {
				ADJACENT
					.map(([dx, dy, dz]): Point => [x + dx, y + dy, z + dz])
					.filter((point) => inBounds(point))
					.map((point) => point.toString())
					.filter((candidate) => !obsidian.has(candidate) && !steam.has(candidate))
					.forEach((point) => {
						steam.add(point);
						newFrontier.add(point);
					});
				return newFrontier;
			}, new Set<string>());
	}

	return steam;
}

const fromString = (point: string): Point => {
	const [x, y, z] = point.split(",");
	return [parseInt(x, 10), parseInt(y, 10), parseInt(z, 10)];
};
