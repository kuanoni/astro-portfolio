import { findAndReplace } from 'mdast-util-find-and-replace';

export default function remarkMagic() {
    const tag = 'MagicCardPreview';

    const splitFirstUnescapedPipe = (s) => {
        let esc = false;
        for (let i = 0; i < s.length; i++) {
            const c = s[i];
            if (esc) { esc = false; continue; }
            if (c === '\\') { esc = true; continue; }
            if (c === '|') return [s.slice(0, i), s.slice(i + 1)];
        }
        return [s, null];
    };

    const unescape = (s) =>
        s.replace(/\\\|/g, '|').replace(/\\\\/g, '\\');

    return (tree) => {
        findAndReplace(
            tree,
            [
                [/\[\[([\s\S]+?)\]\]/g, (_, inner) => {
                    let [label, value] = splitFirstUnescapedPipe(inner);
                    label = unescape(label.trim());
                    value = value == null ? label : unescape(value.trim()); // ← both forms supported

                    const attrs = [];
                    if (value !== '') {
                        attrs.push({ type: 'mdxJsxAttribute', name: 'cardName', value });
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
