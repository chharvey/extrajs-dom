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
    return Array.from(this.node.childNodes).map(function (node) {
      // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
      // TODO make this a static property of Node
      let mapfn = {
        1: (el)   => el.outerHTML    , // ELEMENT_NODE
        2: (node) => null            , // ATTRIBUTE_NODE
        3: (text) => text.data, // TEXT_NODE
        8: (comm) => `<!--${c.data}-->`, // COMMENT_NODE
        11: (frag) => new xjs.DocumentFragment(frag).innerHTML(), // DOCUMENT_FRAGMENT_NODE
        default: (node) => null,
      }
      return (mapfn[node.nodeType] || mapfn.default)(node)
    }).join('')
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
   * In the example below,
   * The `link[rel="import"]` in this fragment has `[data-import="template"]`, and so is replaced with
   * the contents of `template#item-template` in `x-linked-doc.tpl.html`---namely,
   * a `DocumentFragment` containing the `section` element.
   * However, if `[data-import="document"]`, then the replaced content would consist of
   * a `DocumentFragment` (or a `Document`) containing the entirety of `x-linked-doc.tpl.html`,
   * including both the `template#item-template` along with the `h2`.
   *
   * @example
   * this.innerHTML() === `
   *   <ol>
   *     <template id="list-template">
   *       <li>
   *         <link rel="import" href="../tpl/x-linked-doc.tpl.html" data-import="template"/>
   *       </li>
   *     </template>
   *   </ol>
   * `
   *
   * // x-linked-doc.tpl.html:
   * <template id="item-template">
   *   <section>
   *     <h1>a hed</h1>
   *     <p>a graf</p>
   *   </section>
   * </template>
   * <h2>another hed</h2>
   *
   * @param   {string} relativepath should always be `__dirname` when called
   * @returns {xjs.DocumentFragment} `this`
   */
  importLinks(relativepath) {
    this.node.querySelectorAll('link[rel="import"][data-import]').forEach(function (link) {
      // if `HTMLLinkElement#import` is not yet supported, `'import' in link` will be false
      const import_switch = {
        'document': () => ('import' in link) ? link.import.cloneNode(true)                                   : jsdom.JSDOM.fragment(fs.readFileSync(path.resolve(relativepath, link.href), 'utf8')),
        'template': () => ('import' in link) ? link.import.querySelector('template').content.cloneNode(true) : xjs.HTMLTemplateElement.fromFileSync(path.resolve(relativepath, link.href)).content(),
        default() { return null },
      }
      let imported = (import_switch[link.getAttribute('data-import')] || import_switch.default).call(null)
      if (imported && link.parentElement) {
        link.parentElement.append(imported)
        link.remove() // link.href = path.resolve('https://example.com/index.html', link.href) // TODO set the href relative to the current window.location.href
      }
    })
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
