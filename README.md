# [extrajs-dom](https://chharvey.github.io/extrajs-dom/docs/api/)
Javascript extensions to DOM.

DOM code is kinda spaghetti-like.
Use this package to streamline your code and keep the control flow sensible.

## Install

```bash
$ npm install extrajs-dom
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
- `xjs.Node#exe()` executes a custom function for any unsupported features you might need
- `xjs.Node#ifElse()` executes a custom function based on a condition
- `xjs.Element#attr()` sets/removes multiple attributes in one step; taking object and function arguments
- `xjs.Element#{addClass,removeClass,replaceClassString}()` for better `[class]` attribute manipulation
- `xjs.{Document,DocumentFragment}#innerHTML()` gets what you would expect
- Populate `<ol>`, `<ul>`, `<tbody>`, and `<tr>` as lists of data
