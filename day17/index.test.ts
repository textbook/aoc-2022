import { describe, expect, it } from "bun:test";

import { solution } from "./index";

describe("day 17", () => {
	it("works for a simple example", () => {
		expect(solution(simpleExample)).toBe(3_068);
	});
});

const simpleExample = `
>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>
`;
