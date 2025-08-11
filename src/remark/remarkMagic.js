import { findAndReplace } from 'mdast-util-find-and-replace';

/**
 * [[label|value]] -> <MagicCardPreview cardName="value">label</MagicCardPreview>
 * [[text]]        -> <MagicCardPreview>text</MagicCardPreview> (still supported)
 *
 * Options:
 *  - tag: string (default: 'MagicCardPreview')
 *  - attrs: object of extra static attributes (e.g., { foo: 'bar' })
 */
export default function remarkMagic(options = {}) {
    const tag = 'MagicCardPreview';
    const extraAttrs = options.attrs || {};

    const staticAttrs = Object.entries(extraAttrs).map(([name, value]) => ({
        type: 'mdxJsxAttribute',
        name,
        value, // string literal
    }));

    return (tree) => {
        findAndReplace(
            tree,
            [
                [/\[\[([\s\S]+?)\]\]/g, (_, inner) => {
                    // Split on the FIRST pipe only
                    let label = inner;
                    let value = null;

                    const pipeIndex = inner.indexOf('|');
                    if (pipeIndex !== -1) {
                        label = inner.slice(0, pipeIndex);
                        value = inner.slice(pipeIndex + 1);
                    }

                    label = label.trim();
                    if (value != null) value = value.trim();

                    const attrs = [...staticAttrs];
                    if (value != null && value !== '') {
                        attrs.push({
                            type: 'mdxJsxAttribute',
                            name: 'cardName',
                            value, // string literal
                        });
                    }

                    return {
                        type: 'mdxJsxTextElement',
                        name: tag,
                        attributes: attrs,
                        children: [{ type: 'text', value: label }],
                    };
                }],
            ],
            { ignore: ['code', 'inlineCode', 'link', 'linkReference', 'image', 'imageReference', 'definition'] }
        );
    };
}
