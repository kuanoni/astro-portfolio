import IoManager from './IoManager';

interface iFlags {
	middle: boolean;
	aboveMiddle: boolean;
}

const MiddleIoManager = new IoManager<iFlags>(
	(entries) => {
		const entry = entries[0];
		const rootRect = entry.rootBounds;
		const elRect = entry.boundingClientRect;

		if (!rootRect) throw new Error(`IntersectionObserver entry has null root: ${entry}`);

		return { middle: entry.isIntersecting, aboveMiddle: elRect.bottom < rootRect.bottom - rootRect.height / 2 };
	},
	{ rootMargin: '-50% 0% -50% 0%' }
);

export default MiddleIoManager;
