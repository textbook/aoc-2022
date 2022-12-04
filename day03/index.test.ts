import { describe, expect, it } from "bun:test";

import { solution } from "./index";

describe("day 03", () => {
	it("works for a simple example", () => {
		expect(solution(simpleExample)).toBe(157);
	});
});

const simpleExample = `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`.trim();
