import {dev_DocumentFragment, dev_HTMLLinkElement} from '../dev.d'
import xjs_Node from './Node.class'

const fs = require('fs')
const path = require('path')
const util = require('util')

const jsdom = require('jsdom')

/**
 * Wrapper for a DocumentFragment.
 * @see https://www.w3.org/TR/dom/#documentfragment
 */
export default class xjs_DocumentFragment extends xjs_Node {
  /**
   * @summary Concatenate multiple contents into text.
   * @example
   * xjs.DocumentFragment.concat(
   *   new xjs.Element(document.createElement('strong')).append(`hello `),
   *   new xjs.Element(document.createElement('em'    )).append(`world`),
   *   new xjs.Element(document.createElement('mark'  )).append(`!`)
   * ) // '<strong>hello </strong><em>world</em><mark>!</mark>'
   * @param   contents the contents to concatenate
   * @returns the resulting output of concatenation
   */
  static concat(...contents: (xjs_Node|Node|string|null)[]): string {
    return new xjs_DocumentFragment(jsdom.JSDOM.fragment('')).append(...contents).innerHTML()
  }

  /**
   * @summary Read an HTML file and return a document fragment with its contents.
   * @description The DocumentFragment object will be wrapped in an `xjs.DocumentFragment` object.
   * To access the actual element, call {@link xjs_DocumentFragment#node}.
   * @param   filepath the path to the file
   * @returns the fragment, wrapped
   */
  static async fromFile(filepath: string): Promise<xjs_DocumentFragment> {
    let data: string = await util.promisify(fs.readFile)(filepath, 'utf8')
    return new xjs_DocumentFragment(jsdom.JSDOM.fragment(data))
  }
  /**
   * @summary Synchronous version of {@link xjs_DocumentFragment.fromFile}.
   * @param   filepath the path to the file
   * @returns the fragment, wrapped
   */
  static fromFileSync(filepath: string): xjs_DocumentFragment {
    let data: string = fs.readFileSync(filepath, 'utf8')
    return new xjs_DocumentFragment(jsdom.JSDOM.fragment(data))
  }


  /**
   * @summary Construct a new xjs_DocumentFragment object.
   * @param node the node to wrap
   */
  constructor(node: DocumentFragment) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   */
  get node(): dev_DocumentFragment { return <dev_DocumentFragment>super.node }


  /**
   * @summary Get the "innerHTML" of this document fragment.
   * @returns a concatenation of all the `outerHTML` and/or data of the fragment’s node children
   */
  innerHTML(): string {
    const {Node} = new jsdom.JSDOM().window
    // TODO make an enum for node types
    // NB:LINK https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
    const switch_: { [index: string]: (node: Node) => string|null } = {
      [Node.ELEMENT_NODE]          : (el  : Element         ) => el.outerHTML         ,
      [Node.TEXT_NODE]             : (text: Text            ) => text.data            ,
      [Node.COMMENT_NODE]          : (comm: Comment         ) => `<!--${comm.data}-->`,
      [Node.DOCUMENT_FRAGMENT_NODE]: (frag: DocumentFragment) => new xjs_DocumentFragment(frag).innerHTML(),
      default(node: Node) { return null },
    }
    return [...this.node.childNodes].map((node) =>
      (switch_[node.nodeType] || switch_.default).call(null, node)
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
   * @see https://dom.spec.whatwg.org/#dom-parentnode-prepend
   * @param   contents the contents to prepend
   * @returns `this`
   */
  prepend(...contents: (xjs_Node|Node|string|null)[]): this {
    this.node.prepend(...contents.map((c) =>
      (c instanceof xjs_Node) ? c.node :
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
   * @see https://dom.spec.whatwg.org/#dom-parentnode-append
   * @param   contents the contents to append
   * @returns `this`
   */
  append(...contents: (xjs_Node|Node|string|null)[]): this {
    this.node.append(...contents.map((c) =>
      (c instanceof xjs_Node) ? c.node :
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
   * Note: If {@link https://developer.mozilla.org/en-US/docs/Web/Web_Components/HTML_Imports|HTMLLinkElement#import}
   * is supported (by the browser or jsdom), then when `[data-import="document"]` is set,
   * the appended contents will instead be a `Document` object, as defined by
   * {@link https://www.w3.org/TR/html-imports/|HTML Imports}, rather than a `DocumentFragment` object.
   *
   * Note: `DocumentFragment#querySelectorAll` does *not* traverse inside `<template>` elements,
   * so any `<link>` elements inside `<template>` elements will be left untouched.
   * To modify those, you will need to call this method on that `<template>`’s contents (another `DocumentFragment`).
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
   * @param   relativepath should always be `__dirname` when called
   * @returns `this`
   */
  importLinks(relativepath: string): this {
    const xjs_HTMLTemplateElement = require('./HTMLTemplateElement.class').default
    if (!('import' in jsdom.JSDOM.fragment('<link rel="import" href="https://example.com/"/>').querySelector('link'))) {
      console.warn('`HTMLLinkElement#import` is not yet supported. Replacing `<link>`s with their imported contents.')
      this.node.querySelectorAll('link[rel="import"][data-import]').forEach((link: dev_HTMLLinkElement) => {
        const switch_: { [index: string]: () => DocumentFragment|null } = {
          'document': () => xjs_DocumentFragment   .fromFileSync(path.resolve(relativepath, link.href)).node,
          'template': () => xjs_HTMLTemplateElement.fromFileSync(path.resolve(relativepath, link.href)).content(),
          default() { return null },
        }
        let imported = (switch_[<string>link.getAttribute('data-import')] || switch_.default).call(this)
        if (imported) {
          link.after(imported)
          link.remove() // link.href = path.resolve('https://example.com/index.html', link.href) // TODO set the href relative to the current window.location.href
        }
      })
    }
    return this
  }
  /**
   * @summary Asynchronous version of {@link xjs_DocumentFragment#importLinks}.
   * @param   relativepath should always be `__dirname` when called
   */
  async importLinksAsync(relativepath: string): Promise<void[]> {
    const xjs_HTMLTemplateElement = require('./HTMLTemplateElement.class').default
    if (!('import' in jsdom.JSDOM.fragment('<link rel="import" href="https://example.com/"/>').querySelector('link'))) {
      console.warn('`HTMLLinkElement#import` is not yet supported. Replacing `<link>`s with their imported contents.')
      return Promise.all([...this.node.querySelectorAll('link[rel="import"][data-import]')].map(async (link: dev_HTMLLinkElement) => {
        const switch_: { [index: string]: () => Promise<DocumentFragment|null> } = {
          'document': async () => (await xjs_DocumentFragment   .fromFile(path.resolve(relativepath, link.href))).node,
          'template': async () => (await xjs_HTMLTemplateElement.fromFile(path.resolve(relativepath, link.href))).content(),
          async default() { return null },
        }
        let imported = await (switch_[<string>link.getAttribute('data-import')] || switch_.default).call(this)
        if (imported) {
          link.after(imported)
          link.remove() // link.href = path.resolve('https://example.com/index.html', link.href) // TODO set the href relative to the current window.location.href
        }
      }))
    } else return Promise.all([])
  }
}
