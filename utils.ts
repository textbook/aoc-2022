export function intersection(...values: string[]): string[] {
	const [first, ...rest] = values.map((value) => new Set(value));
	return [...new Set(first)].filter((item) => rest.every((set) => set.has(item)));
}

export function sum(values: number[]): number {
	return values.reduce((x: number, y: number): number => x + y, 0);
}
