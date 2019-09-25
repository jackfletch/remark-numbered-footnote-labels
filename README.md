# remark-numbered-footnote-labels

[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

[**remark**][remark] plugin to label footnotes with numbers.

> Note: This plugin slightly differs from [zestedesavoir/zmarkdown]'s [`remark-numbered-footnotes`][zestedesavoir/zmarkdown/remark-numbered-footnotes] in that it retains the footnote identifier in the link and only changes the link label to a number.
> This difference allows an id reference to have some meaningful description while still displaying footnotes as numbers.
> Additionally, this package has documentation that conforms to the [**unified** collective][unified]'s conventions.

## Install

[npm][]:

```sh
npm install remark-numbered-footnote-labels
```

## Use

Say we have the following file, `example.md`:

```markdown
`remark-numbered-footnote-labels` is a quality plugin[^quality]!

[^quality]: If you do not find it so, please file a GitHub issue or pull request!
```

And our script, `example.js`, looks as follows:

```js
const fs = require("fs");
const remark = require("remark");
const toHtml = require("remark-html");
const numberedFootnoteLabels = require("remark-numbered-footnote-labels");

remark()
  .data("settings", { footnotes: true })
  .use(numberedFootnoteLabels)
  .use(toHtml)
  .process(fs.readFileSync("example.md"), function(err, file) {
    if (err) throw err;
    console.log(String(file));
  });
```

Now, running `node example.js` yields (after formatting with [prettier]):

```html
<p>
  <code>remark-numbered-footnote-labels</code> is a quality plugin<sup
    id="fnref-quality"
    ><a href="#fn-quality" class="footnote-ref">1</a></sup
  >!
</p>
<div class="footnotes">
  <hr />
  <ol>
    <li id="fn-quality">
      If you do not find it so, please file a GitHub issue or pull request!<a
        href="#fnref-quality"
        class="footnote-backref"
        >↩</a
      >
    </li>
  </ol>
</div>
```

## API

### `remark().use(numberedFootnoteLabels)`

Label footnotes with sequential numbers instead of user-specified strings.

## Security

Use of `remark-numbered-footnote-labels` is as _safe_ as using [**remark**][remark]'s [footnotes][remark-footnote-option].

This plugin only operates on [**remark**][remark]'s footnote [**mdast**][mdast] nodes to relabel them and does not directly place user input into html.
This plugin does label the footnote links differently than [**remark**][remark], but the associated `id` attributes for these links will be the same as [**remark**][remark] ones.
Thus, one can take the same level of caution as with [**remark**][remark] [footnotes][remark-footnote-option].

## Related

- [`remark-numbered-footnotes`][zestedesavoir/zmarkdown/remark-numbered-footnotes]
  — Changes how footnotes are displayed by using sequential numbers as footnote references instead of user-specified strings
- [`remark-inline-links`](https://github.com/remarkjs/remark-inline-links)
  — Transform references and definitions into normal links and images
- [`remark-defsplit`](https://github.com/remarkjs/remark-defsplit)
  — Transform links and images into references and definitions with URI-based identifiers
- [`remark-reference-links`](https://github.com/remarkjs/remark-reference-links)
  — Transform links and images into references and definitions
- [`remark-unlink`](https://github.com/remarkjs/remark-unlink)
  — Remove all links, references and definitions

## Contribute

See [`contributing.md`][contributing] in [`remarkjs/.github`][health] for ways to get started.
See [`support.md`][support] for ways to get help.

This project has a [Code of Conduct][coc].
By interacting with this repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Jack Fletcher][author]

[remark]: https://github.com/remarkjs/remark
[remark-footnote-option]: https://github.com/remarkjs/remark/blob/master/packages/remark-parse/readme.md#optionsfootnotes
[zestedesavoir/zmarkdown]: https://github.com/zestedesavoir/zmarkdown
[zestedesavoir/zmarkdown/remark-numbered-footnotes]: https://github.com/zestedesavoir/zmarkdown/tree/master/packages/remark-numbered-footnotes
[unified]: https://github.com/unifiedjs/unified
[prettier]: https://github.com/prettier/prettier
[downloads-badge]: https://img.shields.io/npm/dm/remark-numbered-footnote-labels.svg
[downloads]: https://www.npmjs.com/package/remark-numbered-footnote-labels
[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-numbered-footnote-labels.svg
[size]: https://bundlephobia.com/result?p=remark-numbered-footnote-labels
[npm]: https://docs.npmjs.com/cli/install
[health]: https://github.com/remarkjs/.github
[contributing]: https://github.com/remarkjs/.github/blob/master/contributing.md
[support]: https://github.com/remarkjs/.github/blob/master/support.md
[coc]: https://github.com/remarkjs/.github/blob/master/code-of-conduct.md
[license]: LICENSE
[author]: https://jackfletch.com
[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting
[mdast]: https://github.com/syntax-tree/mdast
