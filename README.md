# extrajs-dom
Javascript extensions to DOM.

DOM code is kinda spaghetti-like.
Use this package to streamline your code and keep the control flow sensible.

## Install

```bash
$ npm install extrajs-dom
```

## Get the Docs

```bash
$ cd ./node_modules/extrajs-dom/
$ npm install
$ npm run build
$ open ./docs/api/index.html
```

## Example

traditional DOM methods:
```js
function createMyLink(url, text) {
  let link = document.createElement('a')
  link.classList.add('my-link')
  link.setAttribute('itemprop', 'url')
  link.setAttribute('itemscope', '')
  link.setAttribute('itemtype', 'http://schema.org/URL')
  link.rel = 'author'
  link.href = url
  link.textContent = text
  return link
}
```

extrajs-dom methods:
```js
const xjs = require('extrajs-dom')
const createMyLink = (url, text) =>
  new xjs.HTMLAnchorElement(document.createElement('a'))
    .addClass('my-link')
    .attr({
      itemprop : 'url',
      itemscope: '',
      itemtype : 'http://schema.org/URL',
    })
    .rel('author')
    .href(url)
    .textContent(text)
    .node // returns the modified Node (originally passed to constructor)
```

## Features
- Method chaining
- `xjs.Node#empty()` removes all children
- `xjs.Node#trimInner()` removes all empty and whitespace-only Text node descendants
- `xjs.Node#exe()` takes a custom function for any unsupported features you might need
- `xjs.Element#attr()` sets/removes multiple attributes in one step
- `xjs.Element#attr()` and all other **attribute reflectors** (e.g. `#href()`) may take a function argument
- `xjs.Element#replaceClassString()` replaces string fragments in the `[class]` attribute
- `xjs.DocumentFragment#innerHTML()` does what you would expect
- Render components with `xjs.HTMLTemplateElement` (see that page’s docs for details)
- Populate `<ol>`, `<ul>`, `<tbody>`, and `<tr>` as lists of data *(coming in v4.1)*
