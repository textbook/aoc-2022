import { describe, expect, it } from "bun:test";

import { parser, solution } from "./index";

describe("day 14", () => {
	it("works for a simple example", () => {
		expect(solution(simpleExample)).toBe(93);
	});

	describe("parser", () => {
		it("creates a set of occupied tiles", () => {
			expect(parser(simpleExample)).toStrictEqual(new Set([
				"498,4", "498,5", "498,6",
				"498,6", "497,6", "496,6",
				"503,4", "502,4",
				"502,4", "502,5", "502,6", "502,7", "502,8", "502,9",
				"502,9", "501,9", "500,9", "499,9", "498,9", "497,9", "496,9", "495,9", "494,9",
			]));
		});
	});
});

const simpleExample = `
498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9
`;
