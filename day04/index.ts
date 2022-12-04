export const solution: Solution = (input) => {
	return input
		.split("\n")
		.filter((pair) => {
			const [first, second] = pair.split(",").map(Range.fromString);
			return first.includes(second) || second.includes(first);
		})
		.length;
};

class Range {

	static fromString(item: string) {
		const [start, end] = item.split("-");
		return new Range(parseInt(start, 10), parseInt(end, 10))
	}

	constructor(readonly start: number, readonly end: number) {}

	includes(other: Range): boolean {
		return (this.start <= other.start && this.end >= other.end);
	}
}
