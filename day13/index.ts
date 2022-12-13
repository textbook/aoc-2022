import { sum } from "../utils";

type Packet = Array<number | Packet>;

export const solution: Solution = (input: string): number => {
	const validIndices = input
		.trim()
		.split("\n\n")
		.map((pair): [Packet, Packet] => {
			const [left, right] = pair.split("\n");
			return [JSON.parse(left), JSON.parse(right)];
		})
		.map(([left, right], index) => {
			return valid(left, right) !== false ? index + 1 : 0;
		});
	return sum(validIndices);
};

export const valid = (left: Packet | number, right: Packet | number): boolean | null => {
	if (Array.isArray(left) && Array.isArray(right)) {
		for (let index = 0; index < left.length; index++) {
			if (index >= right.length) {
				return false;
			}
			const isValid = valid(left[index], right[index]);
			if (isValid !== null) {
				return isValid;
			}
		}
		return left.length < right.length || null;
	} else if (Array.isArray(left)) {
		return valid(left, [right]);
	} else if (Array.isArray(right)) {
		return valid([left], right);
	} else {
		return (left === right) ? null : (left < right);
	}
};
