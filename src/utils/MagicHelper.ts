class MagicHelper {
    portal: HTMLDivElement;
    imgElement: HTMLImageElement;

    constructor() {
        const portalQuery = "#magic-portal";
        const imgElementQuery = "#magic-portal>img";
        const portal = document.querySelector<HTMLDivElement>(portalQuery);
        const imgElement = document.querySelector<HTMLImageElement>(imgElementQuery);

        if (!portal) throw new Error(`Query selector failed for query: ${portalQuery}`);
        if (!imgElement) throw new Error(`Query selector failed for query: ${imgElementQuery}`);

        const cardElements = document.querySelectorAll<HTMLSpanElement>('.mcp-element');

        portal.addEventListener("click", (e) => {
            e.stopPropagation();
            this.hideCard();
        })

        cardElements.forEach(element => {
            element.addEventListener("mouseover", (e) => {
                const src = element.attributes.getNamedItem("data-src")?.value;
                const alt = element.attributes.getNamedItem("data-alt")?.value;
                if (!src) throw new Error(`Couldn't find "data-src" value for mcp-element: ${element}`);
                if (!alt) throw new Error(`Couldn't find "data-alt" value for mcp-element: ${element}`);

                this.showCard(src, alt, element);
            });

            element.addEventListener("mouseout", (e) => {
                this.hideCard();
            });
        })

        this.portal = portal;
        this.imgElement = imgElement;
    }

    showCard(imgSrc: string, alt: string, anchor: HTMLElement) {
        const portal = this.portal;
        const img = this.imgElement;

        img.src = imgSrc;
        img.alt = alt;

        portal.style.position = 'fixed';
        portal.classList.remove('hide');

        // Temporarily place offscreen so we can measure size
        portal.style.top = '-9999px';
        portal.style.left = '-9999px';

        const place = () => {
            const margin = 8;
            const vw = window.innerWidth;
            const vh = window.innerHeight;

            const a = anchor.getBoundingClientRect();
            const r = portal.getBoundingClientRect();

            const gap = 12;
            let top = a.bottom + gap;
            if (top + r.height + margin > vh) {
                top = a.top - r.height - gap;
            }
            // Clamp vertically
            top = Math.max(margin, Math.min(top, vh - r.height - margin));

            let left = a.left - 100;
            if (left + r.width + margin > vw) {
                left = vw - r.width - margin;
            }
            if (left < margin) left = margin;

            portal.style.top = `${top}px`;
            portal.style.left = `${left}px`;

            if (vw <= 600) {
                portal.style.top = '';
                portal.style.left = '';
            }
        };

        // if image isn’t loaded yet place after it loads
        if (!img.complete || img.naturalWidth === 0) {
            img.onload = () => { place(); img.onload = null; };
        } else {
            place();
        }
    }

    hideCard() {
        this.portal.classList.add("hide");

        this.imgElement.src = "";
        this.imgElement.alt = "";
    }
}

export default new MagicHelper();