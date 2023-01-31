import IoManager from './IoManager';

interface iFlags {
	above: boolean;
	partialAbove: boolean;
	inside: boolean;
	partialBelow: boolean;
	below: boolean;
}

const EdgesIoManager = new IoManager<iFlags>(
	(entries) => {
		const entry = entries[0];
		const rootRect = entry.rootBounds;
		const elRect = entry.boundingClientRect;

		if (!rootRect) throw new Error(`IntersectionObserver entry has null root: ${entry}`);

		const iFlags = {
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

		return iFlags;
	},
	{ threshold: [0, 1] }
);

export default EdgesIoManager;
