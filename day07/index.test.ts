import { describe, it } from "bun:test";
import { expect } from "chai";

import { parser, solution } from "./index";

describe("day 07", () => {
	it("works for a simple example", () => {
		expect(solution(simpleExample)).to.equal(24_933_642);
	});

	describe("parser", () => {
		it("creates a simple file tree", () => {
			expect(parser("$ cd /\n$ls\ndir a\n123 b.txt"))
				.to.deep.equal({ "a": {}, "b.txt": 123 });
		});

		it("can move down the file system", () => {
			expect(parser("$ cd /\n$ ls\ndir a\n$ cd a\n$ ls\n123 b.txt"))
				.to.deep.equal({ a: { "b.txt": 123 } });
		});

		it("can move up the file system", () => {
			expect(parser("$ cd /\n$ ls\ndir a\n$ cd a\n$ cd ..\n$ ls\n123 b.txt"))
				.to.deep.equal({ a: {}, "b.txt": 123 });
		});
	});
});

const simpleExample = `
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
`.trim();
