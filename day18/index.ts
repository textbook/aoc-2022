const ADJACENT = [
	[ 0,  0,  1],
	[ 0,  0, -1],
	[ 0,  1,  0],
	[ 0, -1,  0],
	[ 1,  0,  0],
	[-1,  0,  0],
]

export const solution: Solution = (input): number => {
	const cubes = new Set(input.trim().split("\n"));
	let exposed = 0;
	cubes.forEach((cube) => {
		const [x, y, z] = fromString(cube);
		ADJACENT.forEach(([dx, dy, dz]) => {
			if (!cubes.has(`${x + dx},${y + dy},${z + dz}`)) {
				exposed++;
			}
		});
	});
	return exposed;
};

const fromString = (point: string): [number, number, number] => {
	const [x, y, z] = point.split(",");
	return [parseInt(x, 10), parseInt(y, 10), parseInt(z, 10)];
};
