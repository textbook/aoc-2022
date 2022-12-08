import { describe, it } from "bun:test";
import { expect } from "chai";

import { solution } from "./index";

describe("day 08", () => {
	it("works for a simple example", () => {
		expect(solution(simpleExample)).to.equal(8);
	});
});

const simpleExample = `
30373
25512
65332
33549
35390
`.trim();
