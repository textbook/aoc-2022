import { describe, expect, it } from "bun:test";

import { parser, solution } from "./index";

describe("day 11", () => {
	it("works for a simple example", () => {
		expect(solution(simpleExample)).toBe(10_605);
	});

	describe("parser", () => {
		it("creates a monkey", () => {
			const [monkey] = parser([
				"Monkey 0:",
				"  Starting items: 1, 2",
				"  Operation: new = old + 1",
				"  Test: divisible by 2",
				"    If true: throw to monkey 4",
				"    If false: throw to monkey 3",
			].join("\n"));
			expect(monkey.hasItems).toBe(true);
			monkey.catchValue(20);
			expect(monkey.throwValue()).toStrictEqual({ value: 0, destination: 4 });
			expect(monkey.throwValue()).toStrictEqual({ value: 1, destination: 3 });
			expect(monkey.throwValue()).toStrictEqual({ value: 7, destination: 3 });
			expect(monkey.hasItems).toBe(false);
			expect(monkey.itemsInspected).toBe(3);
		});
	});
});

const simpleExample = `
Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1
`.trim();
