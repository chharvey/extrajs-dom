import {dev_HTMLTableSectionElement} from '../dev'
import xjs_HTMLElement from './HTMLElement.class'
import Component, {ProcessingFunction} from './_Component.class'


/**
 * Wrapper for HTML `thead`, `tfoot`, and `tbody` elements.
 * @see https://www.w3.org/TR/html52/tabular-data.html#htmltablesectionelement
 */
export default class xjs_HTMLTableSectionElement extends xjs_HTMLElement {
  /**
   * Construct a new xjs_HTMLTableSectionElement object.
   * @param node the node to wrap
   */
  constructor(node: HTMLTableSectionElement) {
    super(node)
  }
  /**
   * This wrapper’s node.
   */
  get node(): dev_HTMLTableSectionElement { return super.node as dev_HTMLTableSectionElement }

  /**
   * Populate this list with items containing data.
   *
   * This method appends items to the end of this list.
   * The items are the result of rendering the given data.
   * In order to determine how the data is rendered, this `<thead/tfoot/tbody>` element must have
   * a `<template>` child, which in turn has a single child that is an `<tr>`.
   *
   * Notes:
   * - This element may contain multiple `<template>` children, but this method uses only the first one.
   * - This element may also already have any number of `<tr>` children; they are not affected.
   *
   * ```js
   * let {document} = new jsdom.JSDOM(`
   * <table>
   *   <tbody>
   *     <template>
   *       <tr>
   *         <td>{{ url }}</td><td>{{ text }}</td>
   *       </tr>
   *     </template>
   *   </tbody>
   * <table>
   * `).window
   * let data = [
   *   { "url": "#0", "text": "Career Connections" },
   *   { "url": "#1", "text": "Getting Licensed & Certified" },
   *   { "url": "#2", "text": "Career resources" },
   *   { "url": "#3", "text": "Code of Ethics" }
   * ]
   * new xjs_HTMLTableSectionElement(document.querySelector('tbody'))
   *   .populate(function (f, d, o) {
   *     f.querySelectorAll('td')[0].textContent = d.url
   *     f.querySelectorAll('td')[1].textContent = d.text
   *   }, data)
   * new xjs_HTMLTableSectionElement(document.querySelector('tbody'))
   *  .populate(function (f, d, o) {
   *    // some code involving `this`
   *  }, data, {}, other_context)
   * ```
   *
   * @param   <T> the type of the data to fill
   * @param   <U> the type of the `options` object
   * @param   processor a typical {@link ProcessingFunction} to modify the template
   * @param   dataset the data to populate the list
   * @param   options additional processing options for all items
   * @param   this_arg provide a `this` context to the processing function
   * @returns `this`
   * @throws  {ReferenceError} if this `<thead/tfoot/tbody>` does not contain a `<template>`,
   *                           or if that `<template>` does not contain exactly 1 `<tr>`.
   */
  populate<T, U extends object>(processor: ProcessingFunction<T, U>, dataset: T[], options?: U, this_arg: unknown = this): this {
    let template: HTMLTemplateElement|null = this.node.querySelector('template')
    if (template === null) {
      throw new ReferenceError('This <thead/tfoot/tbody> does not have a <template> descendant.')
    }
    if (template.content.children.length !== 1 || !template.content.children[0].matches('tr')) {
      throw new ReferenceError('The <template> must contain exactly 1 element, which must be a <tr>.')
    }
    let component: Component<T, U> = new Component(template, processor)
    return this.append(...dataset.map((data) => component.process(data, options, this_arg)))
  }
}
