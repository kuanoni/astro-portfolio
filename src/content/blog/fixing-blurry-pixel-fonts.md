---
title: Fixing blurry pixel fonts
description: Learn how subpixel rendering can mess up your website's pixel font and how you can fix it!
datePublished: 02-27-23
draft: false
---

## The Problem

As I was building my personal site, I was using a font called "FreePixel". As you can probably guess, it's a pixel based font. The font is supposed to be 16px in height and the glyphs are made up of 1px wide aliased lines.

<figure>
<img src="/images/posts/fixing-blurry-pixel-fonts/FreePixel_example.webp" alt="FreePixel font example" style="aspect-ratio: 417 / 99" />
<figcaption>A sample of the FreePixel font.</figcaption>
</figure>

However, I was running into a strange issue with the way my text was rendering on the page. Sometimes the text would look blurry, and other times it would look crisp and pixelated as it should. 

<figure>
<img src="/images/posts/fixing-blurry-pixel-fonts/blurry_crisp_comparison.webp" alt="A comparison of the blurry and crisp text" />
<figcaption>Crisp (top) vs Blurry (bottom)</figcaption>
</figure>

If the width of the viewport was an odd number: blurry text. Even number: crisp. On top of that, on some parts of my page, the text looked blurry either way. So what gives?

After playing around with it for a while, I found that the blurriness occurred when the **text was offset by a non-integer pixel amount**. If your text is offset by say, 0.5px, the browser will try to compensate for that 0.5px by placing the text "inbetween pixels". This process is done by the browser's rendering engine and is called [interpolation](https://www.cambridgeincolour.com/tutorials/image-interpolation.htm). For most fonts which are vector based this isn't much of an issue, however thinner fonts can be blurred drastically.

<figure>
<img src="/images/posts/fixing-blurry-pixel-fonts/interpolation_small.webp" alt="A comparison of the blurry and crisp text" />
<figcaption>My attempt at visualizing pixel interpolation. This is the letter "m" being translated 0.5px to the right.</figcaption>
</figure>

A few things can cause this. In my case, it was due to the container of my text being centered in the viewport with a left and right margin of `auto`. When my viewport width was an odd value and my container width was even (or vice versa) the browser would compute the container's margins to something like `100.5px`. Here's some other ways I found this can occur:

- Using relative units (%, rem, em, etc.) to:
    - Set padding or margins
    - Set flex/grid gap
    - Set absolute/fixed position using `top`, `right`, `left`, or `bottom`
    - `translate` or `scale` your text using `transform`
- Positioning your text using any type of browser computed "auto-layout" position (`margin`, `text-align`, `justify-content`, etc.)
- Using "non-pixel" fonts inline with your pixel font

## Possible Solutions

In general:
1. Make sure that the padding/margins of the container, text, or anything that would affect the position of the text, is an exact pixel value.
2. Make sure that all of the glyphs you use from your font are pixel based. If you try to use a glyph that doesnt exist in your font, the glyph will fallback to a default font, which is vector based and likely have a non-integer width.
3. Force hardware acceleration on whichever container element is offset by a non-integer value. This will cause the text inside to be rendered on an exact pixel value rather than the non-integer value. The result will depend on the browser, but this can be done by adding something like `-webkit-transform: translateZ(0px);` to the element. This is technically a hack and can cause some performance issues if overused. You can read more about forced hardware acceleration [here](https://www.smashingmagazine.com/2016/12/gpu-animation-doing-it-right/).
