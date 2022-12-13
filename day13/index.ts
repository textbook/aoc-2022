import { product } from "../utils";

type Packet = Array<number | Packet>;

const DIVIDERS: Packet[] = [[[2]], [[6]]];

export const solution: Solution = (input: string): number => {
	const packets: Packet[] = parse(input);
	packets.push(...DIVIDERS);
	packets.sort(smallestFirst);
	return product(packets.map((packet, index) => {
		return DIVIDERS.includes(packet) ? index + 1 : 1;
	}));
};

const smallestFirst = (left: Packet, right: Packet): -1 | 0 | 1 => {
	switch (leftSmaller(left, right)) {
		case true:
			return -1;
		case false:
			return 1;
		default:
			return 0;
	}
};

export const leftSmaller = (left: Packet | number, right: Packet | number): boolean | null => {
	if (Array.isArray(left) && Array.isArray(right)) {
		for (let index = 0; index < left.length; index++) {
			if (index >= right.length) {
				return false;
			}
			const isValid = leftSmaller(left[index], right[index]);
			if (isValid !== null) {
				return isValid;
			}
		}
		return left.length < right.length || null;
	} else if (Array.isArray(left)) {
		return leftSmaller(left, [right]);
	} else if (Array.isArray(right)) {
		return leftSmaller([left], right);
	} else {
		return (left === right) ? null : (left < right);
	}
};

const parse = (input: string): Packet[] => input
	.trim()
	.split("\n\n")
	.flatMap((pair): [Packet, Packet] => {
		const [left, right] = pair.split("\n");
		return [JSON.parse(left), JSON.parse(right)];
	});
