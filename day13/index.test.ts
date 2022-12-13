import { describe, expect, it } from "bun:test";

import { leftSmaller, solution } from "./index";

describe("day 13", () => {
	it("works for a simple example", () => {
		expect(solution(simpleExample)).toBe(140);
	});

	describe("leftSmaller", () => {
		it("works for simple numbers", () => {
			expect(leftSmaller(1, 2)).toBe(true);
			expect(leftSmaller(1, 1)).toBeNull();
			expect(leftSmaller(2, 1)).toBe(false);
		});

		it("works for equal length simple arrays", () => {
			expect(leftSmaller([1, 2, 3], [1, 2, 4])).toBe(true);
			expect(leftSmaller([1, 3, 2], [1, 2, 4])).toBe(false);
		});

		it("works for different length simple arrays", () => {
			expect(leftSmaller([1, 2, 3], [1, 2, 3, 4])).toBe(true);
			expect(leftSmaller([1, 2, 3, 4], [1, 2, 3])).toBe(false);
		});

		it("works for compound arrays", () => {
			expect(leftSmaller([1, [2]], [1, 2])).toBe(null);
			expect(leftSmaller([1, 2], [1, [3]])).toBe(true);
			expect(leftSmaller([1, 3], [1, [2]])).toBe(false);
			expect(leftSmaller([9], [[8, 7, 6]])).toBe(false);
		});
	});
});

const simpleExample = `
[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]
`;
