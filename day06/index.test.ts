import { describe, it } from "bun:test";
import { expect } from "chai";

import { solution } from "./index";

describe("day 06", () => {
	it("works for some simple examples", () => {
		expect(solution("bvwbjplbgvbhsrlpgdmjqwftvncz")).to.equal(5);
		expect(solution("nppdvjthqldpwncqszvftbrmjlhg")).to.equal(6);
		expect(solution("mjqjpqmgbljsphdztnvjfqwrcgsmlb")).to.equal(7);
		expect(solution("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")).to.equal(10);
		expect(solution("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw")).to.equal(11);
	});
});
