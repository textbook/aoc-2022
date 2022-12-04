import { describe, expect, it } from "bun:test";

import { Outcome, rps, Shape } from "./rps";

describe("rps", () => {
	[
		[Shape.ROCK, Shape.SCISSORS],
		[Shape.PAPER, Shape.ROCK],
		[Shape.SCISSORS, Shape.PAPER],
	].forEach(([opponent, you]) => {
		it(`${opponent} beats ${you}`, () => {
			expect(rps(opponent, you)).toBe(Outcome.LOSS);
		});
	});
	[
		[Shape.ROCK, Shape.PAPER],
		[Shape.PAPER, Shape.SCISSORS],
		[Shape.SCISSORS, Shape.ROCK],
	].forEach(([opponent, you]) => {
		it(`${opponent} loses to ${you}`, () => {
			expect(rps(opponent, you)).toBe(Outcome.WIN);
		});
	});

	[
		Shape.ROCK,
		Shape.PAPER,
		Shape.SCISSORS,
	].forEach((shape) => {
		it(`${shape} draws with ${shape}`, () => {
			expect(rps(shape, shape)).toBe(Outcome.DRAW);
		});
	});
});
