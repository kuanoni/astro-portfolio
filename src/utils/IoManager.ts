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
		const element = document.querySelector(query);
		if (!element) return console.error(`Element query failed: ${query}`);

		// if callback array at key "query" exists, we don't need to make another observer
		if (this.#observedElements[query]) {
			this.#observedElements[query].push(cb);
			return;
		}

		this.#observedElements[query] = [];

		const observer = new IntersectionObserver((entries) => {
			cb(this.#createIFlags(entries), element);
		}, this.#ioInit);

		observer.observe(element);
	}
}

export default IoManager;