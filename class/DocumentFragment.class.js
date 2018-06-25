const fs = require('fs')
const path = require('path')

const jsdom = require('jsdom')

const xjs = {
  Object : require('extrajs').Object,
  Node   : require('./Node.class.js'),
  Element: require('./Element.class.js'),
  HTMLTemplateElement: require('./HTMLTemplateElement.class.js'),
}

/**
 * Wrapper for a DocumentFragment.
 * @see https://www.w3.org/TR/dom/#documentfragment
 * @extends xjs.Node
 */
xjs.DocumentFragment = class extends xjs.Node {
  /**
   * @summary Read an HTML file and return a document fragment with its contents.
   * @description The DocumentFragment object will be wrapped in an `xjs.DocumentFragment` object.
   * To access the actual element, call {@link xjs.DocumentFragment#node}.
   * @param   {string} filepath the path to the file
   * @returns {xjs.DocumentFragment} the fragment, wrapped
   */
  static async fromFile(filepath) {
    let data = await util.promisify(fs.readFile)(filepath, 'utf8')
    return new xjs.DocumentFragment(jsdom.JSDOM.fragment(data))
  }

  /**
   * @summary Synchronous version of {@link xjs.DocumentFragment.fromFile}.
   * @param   {string} filepath the path to the file
   * @returns {xjs.DocumentFragment} the fragment, wrapped
   */
  static fromFileSync(filepath) {
    let data = fs.readFileSync(filepath, 'utf8')
    return new xjs.DocumentFragment(jsdom.JSDOM.fragment(data))
  }


  /**
   * @summary Construct a new xjs.DocumentFragment object.
   * @param {DocumentFragment} node the node to wrap
   */
  constructor(node) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   * @type {DocumentFragment}
   */
  get node() { return super.node }


  /**
   * @summary Get the "innerHTML" of this document fragment.
   * @returns {string} a concatenation of all the `outerHTML` and/or data of the fragment’s node children
   */
  innerHTML() {
    const {Node} = new jsdom.JSDOM().window
    // NB:LINK https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
    const returned = {
      [Node.ELEMENT_NODE]          : (el)   => el.outerHTML         ,
      [Node.ATTRIBUTE_NODE]        : (attr) => null                 ,
      [Node.TEXT_NODE]             : (text) => text.data            ,
      [Node.COMMENT_NODE]          : (comm) => `<!--${comm.data}-->`,
      [Node.DOCUMENT_FRAGMENT_NODE]: (frag) => new xjs.DocumentFragment(frag).innerHTML(),
      default(node) { return null },
    }
    return Array.from(this.node.childNodes).map((node) =>
      (returned[node.nodeType] || returned.default).call(null, node)
    ).join('')
  }

  /**
   * @summary {@link https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/prepend|ParentNode#prepend}, but returns this object when done.
   * @description This method exists simply for chaining.
   * @example
   * let strong = document.createElement('strong')
   * strong.textContent = 'hello'
   * let em = document.createElement('em')
   * let mark = document.createElement('mark')
   *
   * let snippet = new xjs.DocumentFragment(new DocumentFragment())
   *   .prepend(...[
   *     strong,                                       // DOM Node
   *     ` to the `,                                   // string
   *     new Comment(`great`),                         // DOM Node
   *     `<small>big</small> `,                        // string with HTML
   *     new xjs.Element(em).addContent(`world`).node, // DOM Node (unwrapped)
   *     null,                                         // null
   *     new xjs.Element(mark).addContent(`!`),        // wrapped DOM Node
   *   ]).innerHTML()
   * return snippet === `<strong>hello</strong> to the <!--great--><small>big</small> <em>world</em><mark>!</mark>`
   * @todo TODO xjs.ParentNode#prepend
   * @param   {...?(Node|xjs.Node|string)} contents the contents to prepend
   * @returns {xjs.DocumentFragment} `this`
   */
  prepend(...contents) {
    this.node.prepend(...contents.map((c) =>
      (c instanceof xjs.Node) ? c.node :
      (c === null) ? '' : c
    ))
    return this
  }

  /**
   * @summary {@link https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/append|ParentNode#append}, but returns this object when done.
   * @description This method exists simply for chaining.
   * @example
   * let strong = document.createElement('strong')
   * strong.textContent = 'hello'
   * let em = document.createElement('em')
   * let mark = document.createElement('mark')
   *
   * let snippet = new xjs.DocumentFragment(new DocumentFragment())
   *   .append(...[
   *     strong,                                       // DOM Node
   *     ` to the `,                                   // string
   *     new Comment(`great`),                         // DOM Node
   *     `<small>big</small> `,                        // string with HTML
   *     new xjs.Element(em).addContent(`world`).node, // DOM Node (unwrapped)
   *     null,                                         // null
   *     new xjs.Element(mark).addContent(`!`),        // wrapped DOM Node
   *   ]).innerHTML()
   * return snippet === `<strong>hello</strong> to the <!--great--><small>big</small> <em>world</em><mark>!</mark>`
   * @todo TODO xjs.ParentNode#append
   * @param   {...?(Node|xjs.Node|string)} contents the contents to append
   * @returns {xjs.DocumentFragment} `this`
   */
  append(...contents) {
    this.node.append(...contents.map((c) =>
      (c instanceof xjs.Node) ? c.node :
      (c === null) ? '' : c
    ))
    return this
  }


  /**
   * @summary Replace all `link[rel="import"][data-import]` elements with contents from their documents.
   * @description
   * This method finds all `link[rel="import"][data-import]`s in this document fragment,
   * and then replaces those links with another `DocumentFragment` holding some contents.
   * These contents depend on the value set for `data-import`:
   *
   * - if `[data-import="document"]`, then the replaced contents will be the contents of the link’s imported document itself
   * - if `[data-import="template"]`, then the replaced contents will be the contents of the first `template` descendant in the link’s imported document
   * - if the `[data-import]` attribute value is neither `"document"` nor `"template"`, or if it is absent, then the `link` element is completely ignored and left as-is
   *
   * Note: If {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLLinkElement/import|HTMLLinkElement#import}
   * is supported (by the browser or jsdom), then when `[data-import="document"]` is set,
   * the appended contents will instead be a `Document` object, as defined by
   * {@link https://www.w3.org/TR/html-imports/|HTML Imports}, rather than a `DocumentFragment` object.
   *
   * Note: `DocumentFragment#querySelectorAll` does *not* traverse inside `<template>` elements,
   * so any `<link>` elements inside `<template>` elements will be left untouched.
   * To modify those, you will need to call this method on that `<template>`’s contents (another DocumentFragment).
   *
   * In the example below,
   * The `link[rel="import"]` in this fragment has `[data-import="template"]`, and so is replaced with
   * the contents of `template#sect-template` in `x-linked-doc.tpl.html`---namely,
   * a `DocumentFragment` containing only the `section` element.
   * However, if the link had had `[data-import="document"]`, then the replaced content would consist of
   * a `DocumentFragment` containing the entirety of `x-linked-doc.tpl.html`,
   * including both the `h1` along with the `template#sect-template`.
   *
   * @example
   * // x-linked-doc.tpl.html:
   * <h1>top-level hed</h1>
   * <template id="sect-template">
   *   <section>
   *     <h2>section hed</h2>
   *     <p>a graf</p>
   *   </section>
   * </template>
   *
   * // main.js:
   * // assume `this` is an `xjs.DocumentFragment` instance.
   * this.innerHTML() === `
   *   <ol>
   *     <template id="list-template">
   *       <li>
   *         <link rel="import" data-import="template" href="./x-linked-doc.tpl.html"/>
   *       </li>
   *     </template>
   *   </ol>
   * `
   *
   * // This call will do nothing, as there are no direct `<link>` descendants:
   * // `.querySelectorAll` does not traverse inside `<template>`s.
   * this.importLinks(__dirname)
   *
   * // This call will work as intended.
   * let innerfrag = new xjs.DocumentFragment(this.node.querySelector('template').content)
   * innerfrag.importLinks(__dirname)
   *
   * @param   {string} relativepath should always be `__dirname` when called
   * @returns {xjs.DocumentFragment} `this`
   */
  importLinks(relativepath) {
    let test = jsdom.JSDOM.fragment('<link rel="import" href="https://example.com/"/>').querySelector('link')
    if (!('import' in test)) { // if `HTMLLinkElement#import` is not yet supported
      console.warn('`HTMLLinkElement#import` is not yet supported. Replacing `<link>`s with their imported contents.')
      // REVIEW-INDENTATION
    this.node.querySelectorAll('link[rel="import"][data-import]').forEach(function (link) {
      const import_switch = {
        'document': () => jsdom.JSDOM.fragment(fs.readFileSync(path.resolve(relativepath, link.href), 'utf8')),
        'template': () => xjs.HTMLTemplateElement.fromFileSync(path.resolve(relativepath, link.href)).content(),
        default() { return null },
      }
      let imported = (import_switch[link.getAttribute('data-import')] || import_switch.default).call(null)
      if (imported) {
        link.after(imported)
        link.remove() // link.href = path.resolve('https://example.com/index.html', link.href) // TODO set the href relative to the current window.location.href
      }
    })
    }
    return this
  }


  /**
   * @summary Concatenate multiple contents into text.
   * @example
   * xjs.DocumentFragment.concat(
   *   new xjs.Element(document.createElement('strong')).append(`hello `),
   *   new xjs.Element(document.createElement('em'    )).append(`world`),
   *   new xjs.Element(document.createElement('mark'  )).append(`!`)
   * ) // '<strong>hello </strong><em>world</em><mark>!</mark>'
   * @param   {...?(Node|xjs.Node|string)} contents the contents to concatenate
   * @returns {string} the resulting output of concatenation
   */
  static concat(...contents) {
    return new xjs.DocumentFragment(jsdom.JSDOM.fragment('')).append(...contents).innerHTML()
  }
}

module.exports = xjs.DocumentFragment
