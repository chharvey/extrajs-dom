import {dev_HTMLTableRowElement} from '../dev.d'
import xjs_HTMLElement from './HTMLElement.class'
import xjs_HTMLTemplateElement, {RenderingFunction} from './HTMLTemplateElement.class'


/**
 * Wrapper for HTML `tr` element.
 * @see https://www.w3.org/TR/html52/tabular-data.html#htmltablerowelement
 */
export default class xjs_HTMLTableRowElement extends xjs_HTMLElement {
  /**
   * @summary Construct a new xjs_HTMLTableRowElement object.
   * @param node the node to wrap
   */
  constructor(node: HTMLTableRowElement) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   */
  get node(): dev_HTMLTableRowElement { return super.node as dev_HTMLTableRowElement }

  /**
   * @summary Populate this list with items containing data.
   * @description This method appends items to the end of this list.
   * The items are the result of rendering the given data.
   * In order to determine how the data is rendered, this `<tr>` element must have
   * a `<template>` child, which in turn has a single child that is an `<td>`.
   *
   * Notes:
   * - This element may contain multiple `<template>` children, but this method uses only the first one.
   * - This element may also already have any number of `<td>` children; they are not affected.
   *
   * @example
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
   *   .populate(data, function (f, d, o) {
   *     f.querySelector('a').href        = d.url
   *     f.querySelector('a').textContent = d.text
   *   })
   * new xjs_HTMLTableRowElement(document.querySelector('tr'))
   *  .populate(data, function (f, d, o) {
   *    // some code involving `this`
   *  }, other_context)
   *
   * @param   renderer a typical {@link RenderingFunction} to modify the template
   * @param   dataset the data to populate the list
   * @param   options additional rendering options for all items
   * @param   this_arg provide a `this` context to the rendering function
   * @returns `this`
   * @throws  {ReferenceError} if this `<tr>` does not contain a `<template>`,
   *                           or if that `<template>` does not contain exactly 1 `<td>`.
   */
  populate<T, U extends Object>(renderer: RenderingFunction<T, U>, dataset: T[], options: U = ({} as U), this_arg: unknown = this): this {
    let template: HTMLTemplateElement|null = this.node.querySelector('template')
    if (template === null) {
      throw new ReferenceError('This <tr> does not have a <template> descendant.')
    }
    if (template.content.children.length !== 1 || !template.content.children[0].matches('td')) {
      throw new ReferenceError('The <template> must contain exactly 1 element, which must be a <td>.')
    }
    let component: xjs_HTMLTemplateElement = new xjs_HTMLTemplateElement(template)
    return this.append(...dataset.map((data) => component.render(renderer, data, options, this_arg)))
  }
}
