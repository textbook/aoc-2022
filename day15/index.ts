type Position = [number, number];

interface Sensor {
	beacon: Position;
	position: Position;
	radius: number;
}

export const solution = (input: string): number => {
	const row = parseInt(process.env.DAY_15_ROW ?? "2000000", 10);
	const sensors = parser(input);
	const start = Math.min(...sensors.map((sensor) => minX(sensor, row)).filter((value) => value !== null));
	const end = Math.max(...sensors.map((sensor) => maxX(sensor, row)).filter((value) => value !== null));

	let count = 0;
	for (let x = start; x <= end; x++) {
		if (covered([x, row], sensors)) {
			count++;
		}
	}

	const beaconsInRow = sensors.filter(({ beacon: [, y] }) => y === row);
	return count - new Set(beaconsInRow.map(({ beacon: [x] }) => x)).size;
};

const maxX = ({ position: [x, y], radius }: Sensor, row: number): number | null => {
	const dy = manhattanDistance([0, y], [0, row]);
	if (dy > radius) {
		return null;
	}
	return x + (radius - dy);
};

const minX = ({ position: [x, y], radius }: Sensor, row: number): number | null => {
	const dy = manhattanDistance([0, y], [0, row]);
	if (dy > radius) {
		return null;
	}
	return x - (radius - dy);
};

const covered = (position: Position, sensors: Sensor[]): boolean => sensors.some((sensor) => {
	return manhattanDistance(position, sensor.position) <= sensor.radius;
});

export const parser: Parser<Sensor[]> = (input) => {
	return input.trim().split("\n").map((row) => {
		const [sensor, beacon] = row.split(": ");
		const position = getPosition(sensor);
		const closestBeacon = getPosition(beacon);
		return { beacon: closestBeacon, position, radius: manhattanDistance(position, closestBeacon) };
	});
}

const getPosition = (input: string): Position => {
	const [, x, y] = input.match(/x=(-?\d+), y=(-?\d+)/);
	return [parseInt(x, 10), parseInt(y, 10)];
};

const manhattanDistance = ([start_x, start_y]: Position, [end_x, end_y]: Position): number =>
	Math.abs(start_x - end_x) + Math.abs(start_y - end_y);
