import { describe, it } from "bun:test";
import { expect } from "chai";

import { solution } from "./index";

describe("day 06", () => {
	it("works for some simple examples", () => {
		expect(solution("mjqjpqmgbljsphdztnvjfqwrcgsmlb")).to.equal(19);
		expect(solution("bvwbjplbgvbhsrlpgdmjqwftvncz")).to.equal(23);
		expect(solution("nppdvjthqldpwncqszvftbrmjlhg")).to.equal(23);
		expect(solution("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw")).to.equal(26);
		expect(solution("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")).to.equal(29);
	});
});
