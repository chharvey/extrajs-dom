import {Processor, ProcessingFunction} from 'template-processor'

import xjs_HTMLElement from './HTMLElement.class'


/**
 * Wrapper for HTML `tr` element.
 * @see https://www.w3.org/TR/html52/tabular-data.html#htmltablerowelement
 */
export default class xjs_HTMLTableRowElement extends xjs_HTMLElement {
  /**
   * Construct a new xjs_HTMLTableRowElement object.
   * @param node the node to wrap
   */
  constructor(node: HTMLTableRowElement) {
    super(node)
  }
  /**
   * This wrapper’s node.
   */
  get node(): HTMLTableRowElement { return super.node as HTMLTableRowElement }

  /**
   * Populate this list with items containing data.
   *
   * This method appends items to the end of this list.
   * The items are the result of rendering the given data.
   * In order to determine how the data is rendered, this `<tr>` element must have
   * a `<template>` child, which in turn has a single child that is a `<td>`.
   *
   * Notes:
   * - This element may contain multiple `<template>` children, but this method uses only the first one.
   * - This element may also already have any number of `<td>` children; they are not affected.
   *
   * ```js
   * let {document} = new jsdom.JSDOM(`
   * <table>
   *   <tbody>
   *     <tr>
   *       <template>
   *         <td>
   *           <a href="{{ url }}">{{ text }}</a>
   *         </td>
   *       </template>
   *     </tr>
   *   </tbody>
   * <table>
   * `).window
   * let data = [
   *   { "url": "#0", "text": "Career Connections" },
   *   { "url": "#1", "text": "Getting Licensed & Certified" },
   *   { "url": "#2", "text": "Career resources" },
   *   { "url": "#3", "text": "Code of Ethics" }
   * ]
   * new xjs_HTMLTableRowElement(document.querySelector('tr'))
   *   .populate(function (f, d, o) {
   *     f.querySelector('a').href        = d.url
   *     f.querySelector('a').textContent = d.text
   *   }, data)
   * new xjs_HTMLTableRowElement(document.querySelector('tr'))
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
   * @throws  {TypeError} if this `<tr>` does not contain a `<template>`,
   *                           or if that `<template>` does not contain exactly 1 `<td>`.
   */
  populate<T, U extends object>(instructions: ProcessingFunction<T, U>, dataset: T[], options?: U, this_arg: unknown = this): this {
    let template: HTMLTemplateElement|null = this.node.querySelector('template')
    if (template === null) {
      throw new TypeError('This <tr> does not have a <template> descendant.')
    }
    if (template.content.children.length !== 1 || !template.content.children[0].matches('td')) {
      throw new TypeError('The <template> must contain exactly 1 element, which must be a <td>.')
    }
    let processor: Processor<T, U> = new Processor(template, instructions)
    return this.append(...dataset.map((data) => processor.process(data, options, this_arg)))
  }
}
