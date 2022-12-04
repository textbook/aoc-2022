export const solution = (input: string): number => {
	const data = input
		.split("\n\n")
		.map((section: string): number[] => {
			return section
				.split("\n")
				.map((line) => parseInt(line, 10));
		});
	return Math.max(...data.map((elf) => elf.reduce((a, b) => a + b, 0)));
};
