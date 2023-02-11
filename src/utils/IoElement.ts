import IM from './IoManager';

export default class IoElement {
	element: Element;

	constructor(element: Element | null) {
		if (!element) throw new Error(`IoElement: Constructor element cannot be null.`);
		this.element = element;
	}

	subscribe(slice: SliceName, callback: SubscriptionCallback) {
		IM.subscribe(slice, this);

		this.element.addEventListener(`intersection_${slice}`, (e: CustomEventInit<IoFlags>) => {
			const flags = e.detail;
			if (!flags) return console.error(`IoFlags not found in CustomEvent detail.`);

			callback(flags, this.element);
		});
	}
}
