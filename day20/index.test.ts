import { describe, expect, it } from "bun:test";

import { solution } from "./index";

describe("day 20", () => {
	it("works for a simple example", () => {
		expect(solution(simpleExample)).toBe(3);
	});
});

const simpleExample = `
1
2
-3
3
-2
0
4
`;