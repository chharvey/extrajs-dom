import {dev_HTMLTableRowElement} from '../dev.d'
import xjs_DocumentFragment from './DocumentFragment.class'
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
  get node(): dev_HTMLTableRowElement { return <dev_HTMLTableRowElement>super.node }

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
   * @param   dataset any array of things
   * @param   renderer a typical rendering function
   * @param   this_arg provide a `this` context to the rendering function
   * @param   options additional rendering options for all items
   * @todo WARNING: in the next breaking release (v5), the order of params will be: `renderer`, `dataset`, `options`, `this_arg`
   * @todo WARNING: in the next breaking release (v5), param `renderer` will be required
   * @returns `this`
   * @throws  {ReferenceError} if this `<tr>` does not contain a `<template>`,
   *                           or if that `<template>` does not contain exactly 1 `<td>`.
   */
  populate(dataset: any[], renderer: RenderingFunction = (f,d,o) => {}, this_arg: any = this, options = {}): this {
    console.warn('Notice: Starting in extrajs-dom^5, the param order of `xjs.HTMLTableRowElement#populate` will be `renderer, dataset, options, this_arg`.')
    console.warn('Notice: Starting in extrajs-dom^5, param `renderer` of `xjs.HTMLTableRowElement#populate` will be required.')
    let template: HTMLTemplateElement|null = this.node.querySelector('template')
    if (template === null) {
      throw new ReferenceError('This <tr> does not have a <template> descendant.')
    }
    if (template.content.children.length !== 1 || !template.content.children[0].matches('td')) {
      throw new ReferenceError('The <template> must contain exactly 1 element, which must be a <td>.')
    }
    let component = new xjs_HTMLTemplateElement(template).setRenderer(renderer)
    return this.append(...dataset.map((data) => component.render(data, this_arg, options))) // TODO: in the next breaking release, fix order of params
  }
}
