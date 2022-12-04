export const solution: Solution = (input) => {
	return input
		.split("\n")
		.filter((pair) => {
			const [first, second] = pair.split(",").map(Range.fromString);
			return first.overlaps(second);
		})
		.length;
};

export class Range {

	static fromString(item: string) {
		const [start, end] = item.split("-");
		return new Range(parseInt(start, 10), parseInt(end, 10))
	}

	constructor(readonly start: number, readonly end: number) {}

	includes(other: Range): boolean {
		return (this.start <= other.start && this.end >= other.end);
	}

	overlaps(other: Range): boolean {
		return (
			this.includes(other)
			|| other.includes(this)
			|| (other.start <= this.start && this.start <= other.end)
			|| (other.start <= this.end && this.end <= other.end)
		);
	}
}
