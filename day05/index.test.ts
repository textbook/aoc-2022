import { describe, expect, it } from "bun:test";

import { parser, solution } from "./index";

describe("day 05", () => {
	it("works for a simple example", () => {
		expect(solution(simpleExample)).toBe("MCD");
	});

	describe("parser", () => {
		it("creates a map of the crates", () => {
			const [stacks] = parser("[A]\n[B]     [C]\n[D] [E] [F]\n 1   2   3\n\n");
			expect(stacks).toStrictEqual([undefined, ["D", "B", "A"], ["E"], ["F", "C"]]);
		});

		it("creates a list of the moves", () => {
			const [, [first, second]] = parser("\n\nmove 1 from 2 to 3\nmove 3 from 4 to 5");
			expect(first).toStrictEqual({ count: 1, destination: 3, source: 2 });
			expect(second).toStrictEqual({ count: 3, destination: 5, source: 4 });
		});

		it("works with the simple example", () => {
			const [stacks, moves] = parser(simpleExample);
			expect(stacks).toStrictEqual([
				undefined,
				["Z", "N"],
				["M", "C", "D"],
				["P"],
			]);
			expect(moves).toStrictEqual([
				{ count: 1, source: 2, destination: 1 },
				{ count: 3, source: 1, destination: 3 },
				{ count: 2, source: 2, destination: 1 },
				{ count: 1, source: 1, destination: 2 },
			])
		});
	});
});

const simpleExample = `
    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;
