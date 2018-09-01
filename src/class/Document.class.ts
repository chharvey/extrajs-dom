import * as fs   from 'fs'
import * as path from 'path'
import * as util from 'util'

import * as xjs from 'extrajs'

import {dev_Document, dev_HTMLLinkElement} from '../dev'
import {Content} from '../ambient'
import xjs_Node from './Node.class'
import xjs_DocumentFragment from './DocumentFragment.class'
import xjs_HTMLTemplateElement from './HTMLTemplateElement.class'

const jsdom = require('jsdom')


/**
 * Wrapper for a Document.
 * @see https://www.w3.org/TR/dom/#document
 */
export default class xjs_Document extends xjs_Node {
  /**
   * @summary Read an HTML file and return a document with its contents.
   * @description The Document object will be wrapped in an `xjs.Document` object.
   * To access the actual element, call {@link xjs_Document#node}.
   * @param   filepath the path to the file
   * @returns the document, wrapped
   */
  static async fromFile(filepath: string): Promise<xjs_Document> {
    let data: string = await util.promisify(fs.readFile)(filepath, 'utf8')
    return new xjs_Document(new jsdom.JSDOM(data).window.document)
  }
  /**
   * @summary Synchronous version of {@link xjs_Document.fromFile}.
   * @param   filepath the path to the file
   * @returns the document, wrapped
   */
  static fromFileSync(filepath: string): xjs_Document {
    let data: string = fs.readFileSync(filepath, 'utf8')
    return new xjs_Document(new jsdom.JSDOM(data).window.document)
  }


  /**
   * @summary Construct a new xjs_Document object.
   * @param node the node to wrap
   */
  constructor(node: Document) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   */
  get node(): dev_Document { return super.node as dev_Document }


  /**
   * @summary {@link https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/prepend|ParentNode#prepend}, but returns this object when done.
   * @description This method exists simply for chaining.
   * @example
   * let strong = document.createElement('strong')
   * strong.textContent = 'hello'
   * let em = document.createElement('em')
   * let mark = document.createElement('mark')
   *
   * let snippet = new xjs.Document(new Document())
   *   .prepend(...[
   *     strong,                                       // DOM Node
   *     ` to the `,                                   // string
   *     new Comment(`great`),                         // DOM Node
   *     `<small>big</small> `,                        // string with HTML
   *     new xjs.Element(em).addContent(`world`).node, // DOM Node (unwrapped)
   *     null,                                         // null
   *     new xjs.Element(mark).addContent(`!`),        // wrapped DOM Node
   *   ]).node.querySelector('body').innerHTML
   * return snippet === `<strong>hello</strong> to the <!--great--><small>big</small> <em>world</em><mark>!</mark>`
   * @todo TODO xjs.ParentNode#prepend
   * @see https://dom.spec.whatwg.org/#dom-parentnode-prepend
   * @param   contents the contents to prepend
   * @returns `this`
   */
  prepend(...contents: Content[]): this {
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
   *   ]).node.querySelector('body').innerHTML
   * return snippet === `<strong>hello</strong> to the <!--great--><small>big</small> <em>world</em><mark>!</mark>`
   * @todo TODO xjs.ParentNode#append
   * @see https://dom.spec.whatwg.org/#dom-parentnode-append
   * @param   contents the contents to append
   * @returns `this`
   */
  append(...contents: Content[]): this {
    this.node.append(...contents.map((c) =>
      (c instanceof xjs_Node) ? c.node :
      (c === null) ? '' : c
    ))
    return this
  }

  /**
   * @summary Get the "innerHTML" of this document.
   * @description This method should be used only if this document is an HTML Document,
   * has doctype `html`, and whose root element is the `<html>` element (an instance of `HTMLHtmlElement`).
   *
   * You should only use this method if you do not have access to the original DOM object that this Document belongs to.
   * Otherwise, you should use `dom.serialize()`.
   * @returns a string serialization of this HTML Document
   * @throws {ReferenceError} if this document does not contain an `<html>` element
   */
  innerHTML(): string {
    let root: Element|null = this.node.querySelector('html')
    if (root === null) throw new ReferenceError('No <html> element found.')
    return new jsdom.JSDOM('<!doctype html>' + root.outerHTML).serialize()
  }

  /**
   * @summary Replace all `link[rel~="import"][data-import]` elements with contents from their documents.
   * @description
   * This method finds all `link[rel~="import"][data-import]`s in this document,
   * and then replaces those links with a `DocumentFragment` holding some contents.
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
   * @param   dirpath the absolute path to the directory of the template file containing the `link` element
   * @returns `this`
   */
  importLinks(dirpath: string): this {
    if (!('import' in jsdom.JSDOM.fragment('<link rel="import" href="https://example.com/"/>').querySelector('link'))) {
      console.warn('`HTMLLinkElement#import` is not yet supported. Replacing `<link>`s with their imported contents…')
      this.node.querySelectorAll('link[rel~="import"][data-import]').forEach((link) => {
				let imported = xjs.Object.switch<DocumentFragment|null>(link.getAttribute('data-import') as string, {
					'document': (lnk: HTMLLinkElement) => xjs_DocumentFragment   .fromFileSync(path.resolve(dirpath, lnk.href)).node,
					'template': (lnk: HTMLLinkElement) => xjs_HTMLTemplateElement.fromFileSync(path.resolve(dirpath, lnk.href)).content(),
					'default' : () => null,
				})(link)
        if (imported) {
          (link as dev_HTMLLinkElement).after(imported)
          link.remove() // link.href = path.resolve('https://example.com/index.html', link.href) // TODO set the href relative to the current window.location.href
        }
      })
    }
    return this
  }
  /**
   * @summary Asynchronous version of {@link xjs_Document#importLinks}.
   * @param   dirpath the absolute path to the directory of the template file containing the `link` element
   */
  async importLinksAsync(dirpath: string): Promise<void[]> {
    if (!('import' in jsdom.JSDOM.fragment('<link rel="import" href="https://example.com/"/>').querySelector('link'))) {
      console.warn('`HTMLLinkElement#import` is not yet supported. Replacing `<link>`s with their imported contents…')
      return Promise.all([...this.node.querySelectorAll('link[rel~="import"][data-import]')].map(async (link) => {
				let imported = await xjs.Object.switch<Promise<DocumentFragment|null>>(link.getAttribute('data-import') as string, {
					'document': async (lnk: HTMLLinkElement) => (await xjs_DocumentFragment   .fromFile(path.resolve(dirpath, lnk.href))).node,
					'template': async (lnk: HTMLLinkElement) => (await xjs_HTMLTemplateElement.fromFile(path.resolve(dirpath, lnk.href))).content(),
					'default' : async () => null,
				})(link)
        if (imported) {
          (link as dev_HTMLLinkElement).after(imported)
          link.remove() // link.href = path.resolve('https://example.com/index.html', link.href) // TODO set the href relative to the current window.location.href
        }
      }))
    } else return Promise.all([])
  }
}
