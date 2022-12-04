export function sum(values: number[]): number {
	return values.reduce((x: number, y: number): number => x + y, 0);
}
