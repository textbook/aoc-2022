export const solution: Solution = (input) => {
	return input
		.split("\n")
		.filter((pair) => {
			const [first, second] = pair.split(",").map(range);
			return (
				(first[0] <= second[0] && first[1] >= second[1])
				|| (second[0] <= first[0] && second[1] >= first[1])
			);
		})
		.length;
};

function range(item: string): [number, number] {
	const [start, end] = item.split("-");
	return [parseInt(start, 10), parseInt(end, 10)];
}
