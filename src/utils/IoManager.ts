class IoManager {
	#sliceObservers: SliceObservers;

	constructor() {
		this.#sliceObservers = {
			top: this.#createIo({ rootMargin: '0% 0% -100% 0%' }),
			middleTop: this.#createIo({ rootMargin: '-25% 0% -75% 0%' }),
			middle: this.#createIo({ rootMargin: '-50% 0% -50% 0%' }),
			middleBottom: this.#createIo({ rootMargin: '-75% 0% -25% 0%' }),
			bottom: this.#createIo({ rootMargin: '-100% 0% 0% 0%' }),
		};
	}

	#createIo(init?: IntersectionObserverInit) {
		return new IntersectionObserver((entries) => {
			for (const entry of entries) {
				const { target: element, rootBounds: rootRect, boundingClientRect: elementRect } = entry;

				if (!rootRect) throw new Error('rootRect not found.');

				// create flags that indicate the location of the top and bottom of the element relative to the viewport slice
				const flags: IoFlags = {
					top: this.#getEdgeFlags(elementRect.top, rootRect),
					bottom: this.#getEdgeFlags(elementRect.bottom, rootRect),
				};

				// send flags to element through a custom event
				const event = new CustomEvent<IoFlags>('intersection', { detail: flags });
				element.dispatchEvent(event);
			}
		}, init);
	}

	subscribe(slice: SliceName, ioElement: IoElement) {
		this.#sliceObservers[slice].observe(ioElement.element);
	}

	// calculates flags that indicate the location of the slice (a coordinate on the Y axis) relative to the viewport
	#getEdgeFlags(sliceY: number, rootRect: DOMRect): EdgeFlags {
		// viewport top and bottom
		const rTop = rootRect.top,
			rBot = rootRect.bottom;

		return {
			above: sliceY < rTop,
			below: sliceY > rBot,
		};
	}
}

const IM = new IoManager();
export default IM;
