import { describe, expect, it } from "bun:test";

import { Range, solution } from "./index";

describe("day 04", () => {
	it("works for a simple example", () => {
		expect(solution(simpleExample)).toBe(4);
	});
});

describe("Range", () => {
	([
		[[2, 8], [3, 7]],
		[[4, 6], [6, 6]],
	] as [[number, number], [number, number]][]).forEach(([first, second]) => {
		it(`${first} includes ${second}`, () => {
			expect(new Range(...first).includes(new Range(...second))).toBe(true);
		});
	});

	([
		[[5, 7], [7, 9]],
		[[2, 6], [4, 8]],
		[[3, 7], [2, 8]],
		[[6, 6], [4, 6]],
	] as [[number, number], [number, number]][]).forEach(([first, second]) => {
		it(`${first} does not include ${second}`, () => {
			expect(new Range(...first).includes(new Range(...second))).toBe(false);
		});
	});

	([
		[[5, 7], [7, 9]],
		[[2, 8], [3, 7]],
		[[6, 6], [4, 6]],
		[[2, 6], [4, 8]],
	] as [[number, number], [number, number]][]).forEach(([first, second]) => {
		it(`${first} overlaps ${second}`, () => {
			expect(new Range(...first).overlaps(new Range(...second))).toBe(true);
			expect(new Range(...second).overlaps(new Range(...first))).toBe(true);
		});
	});

	([
		[[2, 4], [6, 8]],
		[[2, 3], [4, 5]],
	] as [[number, number], [number, number]][]).forEach(([first, second]) => {
		it(`${first} does not overlap ${second}`, () => {
			expect(new Range(...first).overlaps(new Range(...second))).toBe(false);
			expect(new Range(...second).overlaps(new Range(...first))).toBe(false);
		});
	});
});

const simpleExample = `
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`.trim();
