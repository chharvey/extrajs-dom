import {dev_HTMLUListElement} from '../dev.d'
import xjs_DocumentFragment from './DocumentFragment.class'
import xjs_HTMLElement from './HTMLElement.class'
import xjs_HTMLTemplateElement, {RenderingFunction} from './HTMLTemplateElement.class'

const path = require('path')


/**
 * Wrapper for HTML `ul` element.
 * @see https://www.w3.org/TR/html52/grouping-content.html#htmlulistelement
 */
export default class xjs_HTMLUListElement extends xjs_HTMLElement {
  /**
   * @summary Return a new `xjs.HTMLTemplateElement` object that renders a `<ul>` filled with `<li>`s.
   * @example
   * const my_tpl = (await xjs.HTMLUListElement.template())
   *   .exe(function () {
   *     new xjs.HTMLUListElement(this.content().querySelector('ul')).addClass('o-List')
   *     new xjs.HTMLLIElement(this.content().querySelector('template').content.querySelector('li')).addClass('o-List__Item')
   *   })
   *   .setRenderer(function (frag, data, opts) {
   *     new xjs.HTMLUListElement(frag.querySelector('ul')).populate(data, function (f, d, o) {
   *       f.querySelector('li').append(d)
   *     }, null, opts)
   *   })
   * my_tpl.render([1,2,3,4,5]) // returns:
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
   * @param   renderer a typical rendering function, used for rendering the list
   * @returns a template rendering a `<ul>` element
   */
  static async template(): Promise<xjs_HTMLTemplateElement> {
    return xjs_HTMLTemplateElement.fromFile(path.join(__dirname, '../../src/tpl/x-htmlulistelement.tpl.html')) // relative to `dist`
  }
  /**
   * @summary Synchronous version of {@link xjs_HTMLUListElement.template}.
   * @returns a template rendering a `<ul>` element
   */
  static templateSync(): xjs_HTMLTemplateElement {
    return xjs_HTMLTemplateElement.fromFileSync(path.join(__dirname, '../../src/tpl/x-htmlulistelement.tpl.html')) // relative to `dist`
  }


  /**
   * @summary Construct a new xjs_HTMLUListElement object.
   * @param node the node to wrap
   */
  constructor(node: HTMLUListElement) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   */
  get node(): dev_HTMLUListElement { return <dev_HTMLUListElement>super.node }

  /**
   * @summary Populate this list with items containing data.
   * @description This method appends items to the end of this list.
   * The items are the result of rendering the given data.
   * In order to determine how the data is rendered, this `<ul>` element must have
   * a `<template>` child, which in turn has a single child that is an `<li>`.
   *
   * Notes:
   * - This element may contain multiple `<template>` children, but this method uses only the first one.
   * - This element may also already have any number of `<li>` children; they are not affected.
   *
   * @example
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
   *   .populate(data, function (f, d, o) {
   *     f.querySelector('a').href        = d.url
   *     f.querySelector('a').textContent = d.text
   *   })
   * new xjs_HTMLUListElement(document.querySelector('ul'))
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
   * @throws  {ReferenceError} if this `<ul>` does not contain a `<template>`,
   *                           or if that `<template>` does not contain exactly 1 `<li>`.
   */
  populate(dataset: any[], renderer: RenderingFunction = (f,d,o) => {}, this_arg: any = this, options = {}): this {
    console.warn('Notice: Starting in extrajs-dom^5, the param order of `xjs.HTMLUListElement#populate` will be `renderer, dataset, options, this_arg`.')
    console.warn('Notice: Starting in extrajs-dom^5, param `renderer` of `xjs.HTMLUListElement#populate` will be required.')
    let template: HTMLTemplateElement|null = this.node.querySelector('template')
    if (template === null) {
      throw new ReferenceError('This <ul> does not have a <template> descendant.')
    }
    if (template.content.children.length !== 1 || !template.content.children[0].matches('li')) {
      throw new ReferenceError('The <template> must contain exactly 1 element, which must be an <li>.')
    }
    let component = new xjs_HTMLTemplateElement(template).setRenderer(renderer)
    return this.append(...dataset.map((data) => component.render(data, this_arg, options))) // TODO: in the next breaking release, fix order of params
  }
}
