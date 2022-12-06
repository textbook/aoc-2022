export const solution: Solution = (input: string, windowLength = 14): number => {
	for (let start = 0; start < input.length - windowLength; start++) {
		if (new Set(input.slice(start, start + windowLength)).size === windowLength) {
			return start + windowLength;
		}
	}
};
