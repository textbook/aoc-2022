export function chunk<T>(items: T[], size: number): T[][] {
	return items.reduce((chunks, item) => {
		if (chunks[chunks.length - 1].length === size) {
			chunks.push([]);
		}
		chunks[chunks.length - 1].push(item);
		return chunks;
	}, [[]] as T[][]);
}

export function intersection(...values: string[]): string[] {
	const [first, ...rest] = values.map((value) => new Set(value));
	return [...new Set(first)].filter((item) => rest.every((set) => set.has(item)));
}

export function product(values: number[]): number {
	return values.reduce((x: number, y: number): number => x * y, 1);
}

export function sum(values: number[]): number {
	return values.reduce((x: number, y: number): number => x + y, 0);
}
