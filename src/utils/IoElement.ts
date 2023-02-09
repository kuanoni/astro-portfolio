import IM from './IoManager';

export default class IoElement {
	element: Element;

	constructor(query: string) {
		const e = document.querySelector(query);
		if (!e) throw new Error(`Element not found for query '${query}'.`);
		this.element = e;
	}

	subscribe(slice: SliceName, callback: SubscriptionCallback) {
		IM.subscribe(slice, this);

		this.element.addEventListener('intersection', (e: CustomEventInit<IoFlags>) => {
			const flags = e.detail;
			if (!flags) return console.error(`IoFlags not found in CustomEvent detail.`);

			callback(flags, this.element);
		});
	}
}
