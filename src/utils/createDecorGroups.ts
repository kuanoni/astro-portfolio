const randNum = (max: number, min: number = 0) => Math.floor(Math.random() * (max - min) + min);

const createElements = (amount: number, imgSrcs: string[], setAnimations: SetAnimations, opts: ElementsOptions) => {
	const { sizeRange, animDelayMin, animDelayMax, animDurMin, animDurMax } = opts;

	const elements: HTMLDivElement[] = [];
	const cellsTaken: number[][] = [];

	const imgSrc = imgSrcs[randNum(imgSrcs.length)];
	const areaSize = Math.floor(amount * sizeRange[1] * 0.75);
	const maxOffset = (sizeRange[1] - sizeRange[0]) / 4;

	for (let i = 0; i < amount; i++) {
		const size = randNum(sizeRange[1], sizeRange[0]);
		const animationDelay = randNum(animDelayMax, animDelayMin) / 1000;
		const animationDuration = randNum(animDurMax, animDurMin) / 1000;

		// creates a "grid" of cells and tries to disperse the fish between the cells,
		// with one fish max per cell
		while (true) {
			const x = randNum(amount);
			const y = randNum(amount);

			// if cell is taken, try again
			if (cellsTaken.find((c) => c[0] === x && c[1] === y)) continue;

			cellsTaken.push([x, y]);
			break;
		}

		const cell = cellsTaken.slice(-1).flat();

		// calculate actual position
		const left = cell[0] * (areaSize / amount) + randNum(maxOffset);
		const top = cell[1] * (areaSize / amount) + randNum(maxOffset);

		// create element and add styles
		const e = document.createElement('div');
		e.style.width = `${size}px`;
		e.style.height = `${size}px`;
		e.style.top = `${top}px`;
		e.style.left = `${left}px`;

		const img = document.createElement('img');
		img.setAttribute('src', imgSrc);
		img.setAttribute('alt', '');

		setAnimations(i, e, img, animationDelay, animationDuration, amount);

		e.appendChild(img);

		elements.push(e);
	}

	return elements;
};

export default (containerQuery: string, imgSrcs: string[], setAnimations: SetAnimations, opts: ElementsOptions) => {
	const containerElements = document.querySelectorAll<HTMLDivElement>(containerQuery);

	containerElements.forEach((container) => {
		const amount = container.getAttribute('data-amount');
		if (!amount) return console.error(`Spawner container missing attribute "data-amount": ${container}`);

		const areaSize = Math.floor(parseInt(amount) * opts.sizeRange[1] * 0.55);
		container.style.width = `${areaSize}px`;
		container.style.height = `${areaSize}px`;

		const elements = createElements(parseInt(amount), imgSrcs, setAnimations, opts);

		elements.forEach((e) => container.appendChild(e));
	});
};
