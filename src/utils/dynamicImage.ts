// Imports images dynamically using an image path
export default (src: string) => {
    const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/**/*.{jpeg,jpg,png,gif,webp}')
    const img = images[`/src/assets/images/${src}`];
    
    if (!img)
	    throw new Error(`"/src/assets/images/${src}" does not exist in glob: "src/assets/images/**.{jpeg,jpg,png,gif,webp}"`);

    return img();
}