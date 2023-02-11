interface EdgeFlags {
	above: boolean;
	below: boolean;
}

interface IoFlags {
	top: EdgeFlags;
	bottom: EdgeFlags;
}

type SliceName = 'top' | 'middleTop' | 'middle' | 'middleBottom' | 'bottom';

interface SliceObservers {
	[i: keyof typeof SliceName]: IntersectionObserver;
}

interface SubscriptionCallback {
	(f: IoFlags, e: Element): void;
}

interface IoElement {
	element: Element;
	subscribe(slice: SliceName, callback: SubscriptionCallback): void;
}
