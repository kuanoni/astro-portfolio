interface ElementsOptions {
	sizeRange: number[];
	animDelayMin?: number;
	animDelayMax: number;
	animDurMin?: number;
	animDurMax: number;
}

interface SetAnimations {
	(i: number, e: HTMLDivElement, img: HTMLImageElement, delay: number, duration: number, amount: number): void;
}
