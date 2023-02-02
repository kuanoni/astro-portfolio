interface IntersectedCallback<Flags> {
	(flags: Flags, element: Element): void;
}

interface ObservedElements<Flags> {
	[i: string]: IntersectedCallback<Flags>[];
}

interface CreateIFlags<Flags> {
	(entries: IntersectionObserverEntry[]): Flags;
}

class IoManager<Flags> {
	#observedElements: ObservedElements<Flags>;
	#createIFlags: CreateIFlags<Flags>;
	#ioInit: IntersectionObserverInit;

	constructor(createIFlags: CreateIFlags<Flags>, ioInit: IntersectionObserverInit) {
		this.#observedElements = {};
		this.#createIFlags = createIFlags;
		this.#ioInit = ioInit;
	}

	subscribe(query: string, cb: IntersectedCallback<Flags>) {
		const elements = document.querySelectorAll(query);

		// initialize observedElements index if not already
		if (!this.#observedElements[query]) this.#observedElements[query] = [];

		elements.forEach((element) => {
			// add callback to the queue
			this.#observedElements[query].push(cb);

			// create observer
			const observer = new IntersectionObserver((entries) => {
				// call each callback
				this.#observedElements[query].forEach((callback) => {
					callback(this.#createIFlags(entries), element);
				});
			}, this.#ioInit);

			//activate observer
			observer.observe(element);
		});
	}
}

export default IoManager;
