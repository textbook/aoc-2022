export const solution: Solution = (input: string): string => {
	let X = 1;
	const screen = [...new Array(6)].map(() => [...new Array<string>(40)].fill("."));
	const instructions = parse(input);

	for (let cycle = 1; cycle <= 240; cycle++) {
		draw(X, cycle, screen);
		const instruction = instructions.shift();
		if (instruction.name === "addx") {
			cycle++;
			draw(X, cycle, screen);
			X += instruction.value;
		}
	}

	return screen.map((row) => row.join("")).join("\n");
};

const draw = (X: number, cycle: number, screen: string[][]) => {
	const x = (cycle - 1) % 40;
	const y = Math.floor((cycle - 1) / 40);
	if (X - 1 <= x && x <= X + 1) {
		screen[y][x] = "#";
	}
};

type AddX = { name: "addx", value: number };
type NoOp = { name: "noop" };
type Instruction = AddX | NoOp;

const parse = (input: string): Instruction[] => input
	.trim()
	.split("\n")
	.map((line) => {
		const [name, value] = line.split(" ");
		switch (name) {
			case "noop":
				return { name };
			case "addx":
				return { name, value: parseInt(value, 10) };
			default:
				throw new Error(`unknown instruction ${name}`);
		}
	});
