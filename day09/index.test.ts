import { describe, expect, it } from "bun:test";

import { solution } from "./index";

describe("day 09", () => {
	it("works for a simple example", () => {
		expect(solution(simpleExample)).toBe(13);
	});
});

const simpleExample = `
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`.trim();
