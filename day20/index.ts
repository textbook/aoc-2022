import { sum } from "../utils";

export const solution: Solution = (input): number => {
	const numbers: [id: number, value: number][] = input
		.trim()
		.split("\n")
		.map((number, index) => [index, parseInt(number, 10)]);

	numbers.slice().forEach(([id, value], iteration) => {
		const oldIndex = indexOf(numbers, (pair) => id === pair[0]);
		const newIndex = normalise(oldIndex + value, numbers.length);
		numbers.splice(oldIndex, 1);
		numbers.splice(newIndex, 0, [id, value]);
	});

	const offset = indexOf(numbers, ([, value]) => value === 0);
	return sum([1_000, 2_000, 3_000].map((index) => {
		const [, value] = numbers[(index + offset) % numbers.length];
		return value;
	}));
};

const normalise = (number: number, limit: number): number => {
	if (0 <= number && number <= limit) {
		return number;
	}
	if (number > limit) {
		return normalise(number - limit + 1, limit);
	}
	return normalise(number + limit - 1, limit);
};

const indexOf = <T>(array: T[], predicate: (value: T) => boolean): number => {
	for (let index = 0; index < array.length; index++) {
		if (predicate(array[index])) {
			return index;
		}
	}
	return -1;
}
