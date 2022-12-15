import { describe, expect, it } from "bun:test";

import { parser, solution } from "./index";

describe("day 15", () => {
	process.env.DAY_15_ROW = "10";

	it("works for a simple example", () => {
		expect(solution(simpleExample)).toBe(26);
	});

	describe("parser", () => {
		it("creates sensors", () => {
			expect(parser("Sensor at x=2, y=18: closest beacon is at x=-2, y=15"))
				.toStrictEqual([{ beacon: [-2, 15], position: [2, 18], radius: 7 }]);
		});
	});
});

const simpleExample = `
Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3
`;
