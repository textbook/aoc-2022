interface Directory {
	[key: string]: Directory | number;
}

const DISK_SIZE = 70_000_000;
const UPDATE_SIZE = 30_000_000;

export const solution: Solution = (input: string): number => {
	const tree = parser(input);
	const sizes = getSizes(tree, {});
	const toDelete = UPDATE_SIZE - (DISK_SIZE - sizes["/"]);
	return Object.values(sizes).sort((a, b) => a - b).find((size) => size >= toDelete);
};

const getSizes = (dir: Directory, sizes: Record<string, number>, path = ""): Record<string, number> => {
	Object.entries(dir).forEach(([name, content]) => {
		if (typeof content === "number") {
			path.split("/").forEach((_, index, parts) => {
				const key = parts.slice(0, index + 1).join("/") || "/";
				sizes[key] = (sizes[key] ?? 0) + content;
			});
		} else {
			getSizes(content, sizes, `${path}/${name}`);
		}
	});
	return sizes;
};

export const parser = (input: string): Directory => {
	const tree = {} as Directory;
	let path: string = "$";

	input.trim().split("\n").forEach((line) => {
		if (line.startsWith("$ cd")) {
			const [, , dir] = line.split(" ");
			path = updatePath(path, dir);
		} else if (!line.startsWith("$")) {
			const [meta, name] = line.split(" ");
			if (meta === "dir") {
				addItem(tree, path, name, {});
			} else {
				addItem(tree, path, name, parseInt(meta, 10));
			}
		}
	});

	return tree;
};

const addItem = (tree: Directory, path: string, name: string, item: Directory | number): void => {
	let dir = tree;
	path.split(".").slice(1).forEach((dirname) => {
		dir = dir[dirname] as Directory;
	});
	dir[name] = item;
}

const updatePath = (path: string, dir: string) => {
	switch (dir) {
		case "/":
			return "$";
		case "..":
			return path.split(".").slice(0, -1).join(".");
		default:
			return `${path}.${dir}`;
	}
};
