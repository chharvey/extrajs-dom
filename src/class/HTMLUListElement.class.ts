import * as path from 'path'

import {Processor, ProcessingFunction} from 'template-processor'

import xjs_HTMLElement from './HTMLElement.class'
import xjs_HTMLTemplateElement from './HTMLTemplateElement.class'


/**
 * Wrapper for HTML `ul` element.
 * @see https://www.w3.org/TR/html52/grouping-content.html#htmlulistelement
 */
export default class xjs_HTMLUListElement extends xjs_HTMLElement {
  /**
   * Return a new `xjs.HTMLTemplateElement` object that renders a `<ul>` filled with `<li>`s.
   *
   * ```js
   * const my_tpl = (await xjs.HTMLUListElement.template())
   *   .exe(function () {
   *     new xjs.HTMLUListElement(this.content().querySelector('ul')).addClass('o-List')
   *     new xjs.HTMLLIElement(this.content().querySelector('template').content.querySelector('li')).addClass('o-List__Item')
   *   })
   * const my_processor = new Processor(my_tpl.node, function (frag, data, opts) {
   *     new xjs.HTMLUListElement(frag.querySelector('ul')).populate(function (f, d, o) {
   *       f.querySelector('li').append(d)
   *     }, data, opts)
   *   })
   * my_processor.process([1,2,3,4,5]) // returns:
   * // ```html
   * // <ul class="o-List">
   * //   <template>
   * //     <li class="o-List__Item">1</li>
   * //     <li class="o-List__Item">2</li>
   * //     <li class="o-List__Item">3</li>
   * //     <li class="o-List__Item">4</li>
   * //     <li class="o-List__Item">5</li>
   * //   </template>
   * // </ul>
   * // ```
   * ```
   * @returns a template rendering a `<ul>` element
   */
  static async template(): Promise<xjs_HTMLTemplateElement> {
    return xjs_HTMLTemplateElement.fromFile(path.join(__dirname, '../../src/tpl/x-htmlulistelement.tpl.html')) // relative to `dist`
  }
  /**
   * Synchronous version of {@link xjs_HTMLUListElement.template}.
   * @returns a template rendering a `<ul>` element
   */
  static templateSync(): xjs_HTMLTemplateElement {
    return xjs_HTMLTemplateElement.fromFileSync(path.join(__dirname, '../../src/tpl/x-htmlulistelement.tpl.html')) // relative to `dist`
  }


  /**
   * Construct a new xjs_HTMLUListElement object.
   * @param node the node to wrap
   */
  constructor(node: HTMLUListElement) {
    super(node)
  }
  /**
   * This wrapper’s node.
   */
  get node(): HTMLUListElement { return super.node as HTMLUListElement }

  /**
   * Populate this list with items containing data.
   *
   * This method appends items to the end of this list.
   * The items are the result of rendering the given data.
   * In order to determine how the data is rendered, this `<ul>` element must have
   * a `<template>` child, which in turn has a single child that is an `<li>`.
   *
   * Notes:
   * - This element may contain multiple `<template>` children, but this method uses only the first one.
   * - This element may also already have any number of `<li>` children; they are not affected.
   *
   * ```js
   * let {document} = new jsdom.JSDOM(`
   * <ul>
   *   <template>
   *     <li>
   *       <a href="{{ url }}">{{ text }}</a>
   *     </li>
   *   </template>
   * </ul>
   * `).window
   * let data = [
   *   { "url": "#0", "text": "Career Connections" },
   *   { "url": "#1", "text": "Getting Licensed & Certified" },
   *   { "url": "#2", "text": "Career resources" },
   *   { "url": "#3", "text": "Code of Ethics" }
   * ]
   * new xjs_HTMLUListElement(document.querySelector('ul'))
   *   .populate(function (f, d, o) {
   *     f.querySelector('a').href        = d.url
   *     f.querySelector('a').textContent = d.text
   *   }, data)
   * new xjs_HTMLUListElement(document.querySelector('ul'))
   *  .populate(function (f, d, o) {
   *    // some code involving `this`
   *  }, data, {}, other_context)
   * ```
   *
   * @param   <T> the type of the data to fill
   * @param   <U> the type of the `options` object
   * @param   instructions a typical {@link ProcessingFunction} to modify the template
   * @param   dataset the data to populate the list
   * @param   options additional processing options for all items
   * @param   this_arg provide a `this` context to the processing function
   * @returns `this`
   * @throws  {ReferenceError} if this `<ul>` does not contain a `<template>`,
   *                           or if that `<template>` does not contain exactly 1 `<li>`.
   */
  populate<T, U extends object>(instructions: ProcessingFunction<T, U>, dataset: T[], options?: U, this_arg: unknown = this): this {
    let template: HTMLTemplateElement|null = this.node.querySelector('template')
    if (template === null) {
      throw new ReferenceError('This <ul> does not have a <template> descendant.')
    }
    if (template.content.children.length !== 1 || !template.content.children[0].matches('li')) {
      throw new ReferenceError('The <template> must contain exactly 1 element, which must be an <li>.')
    }
    let processor: Processor<T, U> = new Processor(template, instructions)
    return this.append(...dataset.map((data) => processor.process(data, options, this_arg)))
  }
}
