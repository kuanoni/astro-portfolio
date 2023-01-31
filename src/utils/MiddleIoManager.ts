import IoManager from './IOManager';

interface iFlags {
	middle: boolean;
}

const MiddleIoManager = new IoManager<iFlags>(
	(entries) => {
		const entry = entries[0];
		return { middle: entry.isIntersecting };
	},
	{ rootMargin: '-50% 0% -50% 0%' }
);

export default MiddleIoManager;
