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

        cardElements.forEach(element => {
            element.addEventListener("mouseover", (e) => {
                const src = element.attributes.getNamedItem("data-src")?.value;
                const alt = element.attributes.getNamedItem("data-alt")?.value;
                if (!src) throw new Error(`Couldn't find "data-src" value for mcp-element: ${element}`);
                if (!alt) throw new Error(`Couldn't find "data-alt" value for mcp-element: ${element}`);
                this.showCard(src, alt, element);
            });

            element.addEventListener("mouseleave", (e) => {
                this.hideCard();
            });
        })

        this.portal = portal;
        this.imgElement = imgElement;
    }

    showCard(imgSrc: string, alt: string, element: HTMLElement) {
        this.portal.classList.remove("hide");

        this.imgElement.src = imgSrc;
        this.imgElement.alt = alt;

        this.portal.style.top = element.offsetTop + "px";
        this.portal.style.left = element.offsetLeft + "px";

        if (window.innerWidth <= 600) {
            this.portal.style.top = "";
            this.portal.style.left = "";
        }
    }

    hideCard() {
        this.portal.classList.add("hide");

        this.imgElement.src = "";
        this.imgElement.alt = "";
    }
}

export default new MagicHelper();