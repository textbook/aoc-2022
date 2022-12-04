import { describe, expect, it } from "bun:test";

import { solution } from "./index";

describe("day 04", () => {
	it("works for a simple example", () => {
		expect(solution(simpleExample)).toBe(2);
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
