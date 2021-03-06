import * as fs   from 'fs'
import * as path from 'path'
import * as util from 'util'

import * as jsdom from 'jsdom'

import {Content} from '../ambient'
import xjs_ParentNode from '../iface/ParentNode.iface'
import xjs_Node, { NodeType } from './Node.class'
import xjs_Element from './Element.class'
import xjs_HTMLTemplateElement_import from './HTMLTemplateElement.class'


/**
 * Wrapper for a DocumentFragment.
 * @see https://www.w3.org/TR/dom/#documentfragment
 */
export default class xjs_DocumentFragment extends xjs_Node implements xjs_ParentNode {
  /**
   * Concatenate multiple contents into text.
   *
   * ```js
   * xjs.DocumentFragment.concat(
   *   new xjs.Element(document.createElement('strong')).append(`hello `),
   *   new xjs.Element(document.createElement('em'    )).append(`world`),
   *   new xjs.Element(document.createElement('mark'  )).append(`!`)
   * ) // '<strong>hello </strong><em>world</em><mark>!</mark>'
   * ```
   * @param   contents the contents to concatenate
   * @returns the resulting output of concatenation
   */
  static concat(...contents: Content[]): string {
    return new xjs_DocumentFragment(jsdom.JSDOM.fragment('')).append(...contents).innerHTML()
  }

	/**
	 * Read an HTML string and return a document fragment with its contents.
	 *
	 * The DocumentFragment object will be wrapped in an `xjs.DocumentFragment` object.
	 * To access the actual fragment, call {@link xjs_DocumentFragment#node}.
	 * @param   str a string of markup
	 * @returns the fragment, wrapped
	 */
	static fromString(str: string): xjs_DocumentFragment {
		return new xjs_DocumentFragment(jsdom.JSDOM.fragment(str))
	}

  /**
   * Read an HTML file and return a document fragment with its contents.
   *
   * The DocumentFragment object will be wrapped in an `xjs.DocumentFragment` object.
   * To access the actual fragment, call {@link xjs_DocumentFragment#node}.
   * @param   filepath the path to the file
   * @returns the fragment, wrapped
   */
  static async fromFile(filepath: string): Promise<xjs_DocumentFragment> {
		return xjs_DocumentFragment.fromString(await util.promisify(fs.readFile)(filepath, 'utf8'))
  }
  /**
   * Synchronous version of {@link xjs_DocumentFragment.fromFile}.
   * @param   filepath the path to the file
   * @returns the fragment, wrapped
   */
  static fromFileSync(filepath: string): xjs_DocumentFragment {
		return xjs_DocumentFragment.fromString(fs.readFileSync(filepath, 'utf8'))
  }


  /**
   * Construct a new xjs_DocumentFragment object.
   * @param node the node to wrap
   */
  constructor(node: DocumentFragment) {
    super(node)
  }
  /**
   * This wrapper’s node.
   */
  get node(): DocumentFragment { return super.node as DocumentFragment }

	/** @implements xjs_ParentNode */
  prepend(...contents: Content[]): this {
    this.node.prepend(...contents.map((c) =>
      (c instanceof xjs_Node) ? c.node :
      (c === null) ? '' : c
    ))
    return this
  }

	/** @implements xjs_ParentNode */
  append(...contents: Content[]): this {
    this.node.append(...contents.map((c) =>
      (c instanceof xjs_Node) ? c.node :
      (c === null) ? '' : c
    ))
    return this
  }

	/** @implements xjs_ParentNode */
	querySelector(selector: string): xjs_Element|null {
		let el: Element|null = this.node.querySelector(selector)
		return (el === null) ? null : new xjs_Element(el)
	}

	/** @implements xjs_ParentNode */
	querySelectorAll(selector: string): xjs_Element[] {
		return [...this.node.querySelectorAll(selector)].map((el) => new xjs_Element(el))
	}

  /**
   * Get the "innerHTML" of this document fragment.
   * @returns a concatenation of all the `outerHTML` and/or data of the fragment’s node children
   */
  innerHTML(): string {
    return [...this.node.childNodes].map((node) =>
			(new Map<NodeType, (c: any) => string>([
				[NodeType.ELEMENT_NODE           , (el  : Element         ) => el.outerHTML],
				[NodeType.TEXT_NODE              , (text: Text            ) => text.data],
				[NodeType.COMMENT_NODE           , (comm: Comment         ) => `<!--${comm.data}-->`],
				[NodeType.DOCUMENT_FRAGMENT_NODE , (frag: DocumentFragment) => new xjs_DocumentFragment(frag).innerHTML()],
			]).get(node.nodeType) || (() => ''))(node)
    ).join('')
  }

  /**
   * Replace all `link[rel~="import"][data-import]` elements with contents from their documents.
   *
   * This method finds all `link[rel~="import"][data-import]`s in this document fragment,
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
   * ```js
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
   * ```
   *
   * @param   dirpath the absolute path to the directory of the template file containing the `link` element
   * @returns `this`
   */
  importLinks(dirpath: string): this {
		const xjs_HTMLTemplateElement: typeof xjs_HTMLTemplateElement_import = require('./HTMLTemplateElement.class').default
    if (!('import' in jsdom.JSDOM.fragment('<link rel="import" href="https://example.com/"/>').querySelector('link') !)) {
      console.warn('`HTMLLinkElement#import` is not yet supported. Replacing `<link>`s with their imported contents…')
      this.node.querySelectorAll('link[rel~="import"][data-import]').forEach((link) => {
				if (!['document', 'template'].includes(link.getAttribute('data-import') !)) {
					throw new TypeError('Value of attribute `[data-import]` must be either `"document"` or `"template"`.')
				}
				const imported: DocumentFragment = new Map([
					['document', (lnk: HTMLLinkElement) => xjs_DocumentFragment   .fromFileSync(path.resolve(dirpath, lnk.href)).node     ],
					['template', (lnk: HTMLLinkElement) => xjs_HTMLTemplateElement.fromFileSync(path.resolve(dirpath, lnk.href)).content()],
				]).get(link.getAttribute('data-import') !) !(link as HTMLLinkElement)
          link.after(imported)
          link.remove() // link.href = path.resolve('https://example.com/index.html', link.href) // TODO set the href relative to the current window.location.href
      })
    }
    return this
  }
  /**
   * Asynchronous version of {@link xjs_DocumentFragment.importLinks}.
   * @param   dirpath the absolute path to the directory of the template file containing the `link` element
   */
  async importLinksAsync(dirpath: string): Promise<this> {
		const xjs_HTMLTemplateElement: Promise<typeof xjs_HTMLTemplateElement_import> = import('./HTMLTemplateElement.class').then((m) => m.default)
    if (!('import' in jsdom.JSDOM.fragment('<link rel="import" href="https://example.com/"/>').querySelector('link') !)) {
      console.warn('`HTMLLinkElement#import` is not yet supported. Replacing `<link>`s with their imported contents…')
      await Promise.all([...this.node.querySelectorAll('link[rel~="import"][data-import]')].map(async (link) => {
				if (!['document', 'template'].includes(link.getAttribute('data-import') !)) {
					throw new TypeError('Value of attribute `[data-import]` must be either `"document"` or `"template"`.')
				}
				const imported: Promise<DocumentFragment> = new Map([
					['document', async (lnk: HTMLLinkElement) => (await xjs_DocumentFragment           .fromFile(path.resolve(dirpath, lnk.href))).node],
					['template', async (lnk: HTMLLinkElement) => (await (await xjs_HTMLTemplateElement).fromFile(path.resolve(dirpath, lnk.href))).content()],
				]).get(link.getAttribute('data-import') !) !(link as HTMLLinkElement)
				link.after(await imported)
          link.remove() // link.href = path.resolve('https://example.com/index.html', link.href) // TODO set the href relative to the current window.location.href
      }))
    }
		return this
  }
}
