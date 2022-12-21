export const solution: Solution = (input): number => {
	const network = parser(input);
	return network.root();
};

const parser = (input: string): { [key: string]: () => number } => {
	const network: { [key: string]: () => number } = {};
	input.trim().split("\n").forEach((row) => {
		const [key, rest] = row.split(": ");
		if (rest.match(/^\d+$/)) {
			network[key] = (): number => parseInt(rest, 10);
		} else {
			const [first, op, second] = rest.split(" ");
			network[key] = (): number => {
				switch (op) {
					case "+":
						return network[first]() + network[second]();
					case "-":
						return network[first]() - network[second]();
					case "*":
						return network[first]() * network[second]();
					case "/":
						return network[first]() / network[second]();
				}
			}
		}
	});
	return network;
};
