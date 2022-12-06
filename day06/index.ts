export const solution: Solution = (input: string): number => {
	for (let start = 0; start < input.length - 4; start++) {
		if (new Set(input.slice(start, start + 4)).size === 4) {
			return start + 4;
		}
	}
};
