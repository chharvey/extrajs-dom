const path = require('path')

const jsdom = require('jsdom')

const xjs = {
  Node: require('./Node.class.js'),
}

/**
 * Wrapper for a Document.
 * @see https://www.w3.org/TR/dom/#document
 * @extends xjs.Node
 */
xjs.Document = class extends xjs.Node {
  /**
   * @summary Construct a new xjs.Document object.
   * @param {Document} node the node to wrap
   */
  constructor(node) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   * @type {Document}
   */
  get node() { return super.node }


  /**
   * @summary Replace all `link[rel="import"][data-import]` elements with contents from their documents.
   * @description
   * This method finds all `link[rel="import"][data-import]`s in this document,
   * and then replaces those links with a `DocumentFragment` holding some contents.
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
   * Note: `Document#querySelectorAll` does *not* traverse inside `<template>` elements,
   * so any `<link>` elements inside `<template>` elements will be left untouched.
   * To modify those, you will need to call this method on that `<template>`’s contents (another `DocumentFragment`).
   *
   * In the example below,
   * The `link[rel="import"]` in this document has `[data-import="template"]`, and so is replaced with
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
   * // assume `this` is an `xjs.Document` instance.
   * this.innerHTML() === `
   *   <link rel="import" data-import="document" href="./x-linked-doc.tpl.html"/>
   * `
   *
   * // This call will work as intended.
   * this.importLinks(__dirname)
   *
   * @param   {string} relativepath should always be `__dirname` when called
   * @returns {xjs.Document} `this`
   */
  importLinks(relativepath) {
    const xjs_DocumentFragment    = require('./DocumentFragment.class.js')
    const xjs_HTMLTemplateElement = require('./HTMLTemplateElement.class.js')
    if (!('import' in jsdom.JSDOM.fragment('<link rel="import" href="https://example.com/"/>').querySelector('link'))) {
      console.warn('`HTMLLinkElement#import` is not yet supported. Replacing `<link>`s with their imported contents.')
      this.node.querySelectorAll('link[rel="import"][data-import]').forEach((link) => {
        const import_switch = {
          'document': () => xjs_DocumentFragment   .fromFileSync(path.resolve(relativepath, link.href)).node,
          'template': () => xjs_HTMLTemplateElement.fromFileSync(path.resolve(relativepath, link.href)).content(),
          default() { return null },
        }
        let imported = (import_switch[link.getAttribute('data-import')] || import_switch.default).call(this)
        if (imported) {
          link.after(imported)
          link.remove() // link.href = path.resolve('https://example.com/index.html', link.href) // TODO set the href relative to the current window.location.href
        }
      })
    }
    return this
  }
  /**
   * @summary Asynchronous version of {@link xjs.Document#importLinks}.
   * @param   {string} relativepath should always be `__dirname` when called
   */
  async importLinksAsync(relativepath) {
    const xjs_DocumentFragment    = require('./DocumentFragment.class.js')
    const xjs_HTMLTemplateElement = require('./HTMLTemplateElement.class.js')
    if (!('import' in jsdom.JSDOM.fragment('<link rel="import" href="https://example.com/"/>').querySelector('link'))) {
      console.warn('`HTMLLinkElement#import` is not yet supported. Replacing `<link>`s with their imported contents.')
      return Promise.all([...this.node.querySelectorAll('link[rel="import"][data-import]')].map(async (link) => {
        const import_switch = {
          'document': async () => (await xjs_DocumentFragment   .fromFile(path.resolve(relativepath, link.href))).node,
          'template': async () => (await xjs_HTMLTemplateElement.fromFile(path.resolve(relativepath, link.href))).content(),
          async default() { return null },
        }
        let imported = await (import_switch[link.getAttribute('data-import')] || import_switch.default).call(this)
        if (imported) {
          link.after(imported)
          link.remove() // link.href = path.resolve('https://example.com/index.html', link.href) // TODO set the href relative to the current window.location.href
        }
      }))
    }
  }
}


module.exports = xjs.Document
