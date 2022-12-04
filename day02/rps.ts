export const enum Shape {
	ROCK = 1,
	PAPER = 2,
	SCISSORS = 3,
}

export const enum Outcome {
	WIN = 6,
	DRAW = 3,
	LOSS = 0,
}

const BEATS = {
	[Shape.ROCK]: Shape.SCISSORS,
	[Shape.PAPER]: Shape.ROCK,
	[Shape.SCISSORS]: Shape.PAPER,
}

export const rps = (opponent: Shape, you: Shape): Outcome => {
	if (opponent === you) {
		return Outcome.DRAW;
	}
	return BEATS[you] === opponent ? Outcome.WIN : Outcome.LOSS;
};
