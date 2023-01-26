const setClassOnIntersection = (
	observedQuery: string,
	styledQuery: string,
	aboveClassName: string | null,
	visibleClassName: string | null,
	belowClassName: string | null
) => {
	const observedElement = document.querySelector(observedQuery);
	const styledElement = document.querySelector(styledQuery);

	if (!observedElement) return console.error(`Failed to find element: ${observedQuery}`);
	if (!styledElement) return console.error(`Failed to find element: ${styledQuery}`);

	const setClassName = (className: string | null) => {
		if (visibleClassName) styledElement.classList.remove(visibleClassName);
		if (aboveClassName) styledElement.classList.remove(aboveClassName);
		if (belowClassName) styledElement.classList.remove(belowClassName);
		if (className) styledElement.classList.add(className);
	};

	const observer = new IntersectionObserver(
		(entries) => {
			const entry = entries[0];

			if (entry.isIntersecting) return setClassName(visibleClassName);
			else {
				if (entry.boundingClientRect.y >= 0) return setClassName(aboveClassName);
				if (entry.boundingClientRect.y < 0) return setClassName(belowClassName);
			}
		},
		{ threshold: 1 }
	);

	observer.observe(observedElement);
};

export default setClassOnIntersection;
