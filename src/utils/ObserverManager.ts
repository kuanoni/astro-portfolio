type ObserverCallback = (i: IntersectedFlags) => void;

interface ObserverCallbacks {
	[i: string]: ObserverCallback[];
}

interface IntersectedFlags {
	above: boolean;
	partialAbove: boolean;
	inside: boolean;
	partialBelow: boolean;
	below: boolean;
}

export default class ObserverManager {
	observerCallbacks: ObserverCallbacks;

	constructor() {
		this.observerCallbacks = {};
	}

	subscribe(query: string, cb: (i: IntersectedFlags) => void) {
		const element = document.querySelector(query);
		if (!element) return console.error(`Element query failed: ${query}`);

		// if callback array at key "query" exists, we don't need to make another observer
		if (this.observerCallbacks[query]) {
			this.observerCallbacks[query].push(cb);
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				const rootRect = entry.rootBounds;
				const elRect = entry.boundingClientRect;

				if (!rootRect) return console.error(`IntersectionObserver entry has null root: ${entry}`);

				const intersected: IntersectedFlags = {
					// element bottom is above viewport top
					above: elRect.bottom < rootRect.top,
					// element top is above viewport top, but element is visible
					partialAbove: entry.isIntersecting && elRect.top < rootRect.top,
					// element is fully visible
					inside: entry.isIntersecting && entry.intersectionRatio === 1,
					// element bottom is below viewport bottom, but element is visible
					partialBelow: entry.isIntersecting && elRect.bottom > rootRect.bottom,
					// element top is below viewport bottom
					below: elRect.top > rootRect.bottom,
				};

				this.observerCallbacks[query].forEach((callback) => callback(intersected));
			},
			{ threshold: [0, 1] }
		);

		// initialize callback array at key "query"
		this.observerCallbacks[query] = [cb];
		observer.observe(element);
	}
}