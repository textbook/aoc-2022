import { product } from "../utils";

type Packet = Array<number | Packet>;

const DIVIDERS = ["[[2]]", "[[6]]"]

export const solution: Solution = (input: string): number => {
	const packets: Packet[] = input
		.trim()
		.split("\n\n")
		.flatMap((pair): [Packet, Packet] => {
			const [left, right] = pair.split("\n");
			return [JSON.parse(left), JSON.parse(right)];
		});
	packets.push(...DIVIDERS.map((packet): Packet => JSON.parse(packet)));
	packets.sort((left, right): -1 | 0 | 1 => {
		switch (valid(left, right)) {
			case true:
				return -1;
			case false:
				return 1;
			default:
				return 0;
		}
	});
	return product(packets.map((packet, index) => {
		return DIVIDERS.includes(JSON.stringify(packet)) ? index + 1 : 1;
	}));
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
