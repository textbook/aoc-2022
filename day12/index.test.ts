import { describe, expect, it } from "bun:test";

import { parser, solution } from "./index";

describe("day 12", () => {
	it("works for a simple example", () => {
		expect(solution(simpleExample)).toBe(29);
	});

	describe("parser", () => {
		it("finds the start", () => {
			const { start } = parser(simpleExample);
			expect(start).toStrictEqual([0, 0]);
		});

		it("finds the end", () => {
			const { end } = parser(simpleExample);
			expect(end).toStrictEqual([5, 2]);
		});

		it("maps the terrain", () => {
			const { terrain } = parser(simpleExample);
			expect(terrain).toStrictEqual([
				[ 0,  0,  1, 16, 15, 14, 13, 12],
				[ 0,  1,  2, 17, 24, 23, 23, 11],
				[ 0,  2,  2, 18, 25, 25, 23, 10],
				[ 0,  2,  2, 19, 20, 21, 22,  9],
				[ 0,  1,  3,  4,  5,  6,  7,  8],
			]);
		});
	});
});

const simpleExample = `
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
`;
