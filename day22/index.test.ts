import { describe, expect, it } from "bun:test";

import { parser, solution } from "./index";

describe("day 22", () => {
	it("works for a simple example", () => {
		expect(solution(simpleExample)).toBe(6_032);
	});

	describe("parser", () => {
		it("creates a map", () => {
			const { map } = parser(simpleExample);
			expect(map).toHaveLength(12);
			map.forEach((row) => expect(row).toHaveLength(16));
			expect(map[0]).toEqual([" ", " ", " ", " ", " ", " ", " ", " ", ".", ".", ".", "#", " ", " ", " ", " "]);
		});

		it("creates a path", () => {
			const { path } = parser(simpleExample);
			expect(path).toHaveLength(13);
			expect(path.slice(0, 4)).toStrictEqual([
				{ distance: 10 },
				{ direction: "R" },
				{ distance: 5 },
				{ direction: "L" },
			])
		});
	});
});

const simpleExample = `        ...#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5
`;
