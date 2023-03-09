class ModalHelper {
	portal: HTMLDivElement;
	modalContent: HTMLDivElement;
	buttonOpenedWith: HTMLElement | null;

	constructor() {
		const portalQuery = '#modal-portal';
		const modalContentQuery = '#modal-content';

		const portal = document.querySelector<HTMLDivElement>(portalQuery);
		const modalContent = document.querySelector<HTMLDivElement>(modalContentQuery);

		if (!portal) throw new Error(`Query selector failed for query: ${portalQuery}`);
		if (!modalContent) throw new Error(`Query selector failed for query: ${modalContentQuery}`);

		this.portal = portal;
		this.modalContent = modalContent;
		this.buttonOpenedWith = null;

		// any click on the modal will close it
		this.portal.addEventListener('click', (e) => {
			e.stopImmediatePropagation();
			this.close();
		});
	}

	addContent(element: HTMLElement | Node | null) {
		if (element) this.modalContent.appendChild(element);
		else throw new Error(`Failed to add element to modal: ${element}`);
	}

	clearContent() {
		this.modalContent.innerHTML = '';
	}

	open(buttonOpenedWith: HTMLElement | null) {
		this.portal.classList.add('open');
		this.focusTrap();

		this.buttonOpenedWith = buttonOpenedWith;
	}

	close() {
		this.portal.classList.remove('open');
		this.clearContent();

		// re-focus on the button originally used to open the modal
		if (this.buttonOpenedWith) this.buttonOpenedWith.focus();
	}

	// traps focus inside the modal
	focusTrap() {
		const focusableElements = this.portal.querySelectorAll<HTMLElement>(
			'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
		);

		const firstFocusableElement = focusableElements[0];
		const lastFocusableElement = focusableElements[focusableElements.length - 1];

		// move focus inside modal
		firstFocusableElement.focus();

		this.portal.addEventListener('keydown', (e) => {
			if (e.key !== 'Tab') return;

			if (e.shiftKey) {
				// shift + tab
				if (document.activeElement === firstFocusableElement) {
					lastFocusableElement.focus();
					e.preventDefault();
				}
			} else {
				// tab
				if (document.activeElement === lastFocusableElement) {
					firstFocusableElement.focus();
					e.preventDefault();
				}
			}
		});
	}
}

export default new ModalHelper();
