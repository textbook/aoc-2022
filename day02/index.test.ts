import { describe, expect, it } from "bun:test";

import { solution } from "./index";

describe("day 02", () => {
	it("works for a simple example", () => {
		expect(solution(simpleExample)).toBe(15);
	});
});

const simpleExample = `
A Y
B X
C Z
`.trim();
