import { describe, expect, it } from "bun:test";

import { solution } from "./index";

describe("day 01", () => {
	it("works for a simple example", () => {
		expect(solution(simpleExample)).toBe(45_000);
	});
});

const simpleExample = `
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`.trim()
