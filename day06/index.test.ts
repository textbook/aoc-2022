import { describe, expect, it } from "bun:test";

import { solution } from "./index";

describe("day 06", () => {
	it("works for some simple examples", () => {
		expect(solution("mjqjpqmgbljsphdztnvjfqwrcgsmlb")).toBe(19);
		expect(solution("bvwbjplbgvbhsrlpgdmjqwftvncz")).toBe(23);
		expect(solution("nppdvjthqldpwncqszvftbrmjlhg")).toBe(23);
		expect(solution("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw")).toBe(26);
		expect(solution("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")).toBe(29);
	});
});
