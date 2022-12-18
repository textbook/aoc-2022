import { describe, expect, it } from "bun:test";

import { solution } from "./index";

describe("day 18", () => {
	it("works for a trivial example", () => {
		expect(solution("1,1,1\n2,1,1")).toBe(10);
	});

	it("works for a simple example", () => {
		expect(solution(simpleExample)).toBe(64);
	});
});

const simpleExample = `
2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5
`;
