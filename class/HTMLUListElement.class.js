const xjs = {
  DocumentFragment: require('../dist/class/DocumentFragment.class.js').default,
  HTMLElement: require('./HTMLElement.class.js'),
  HTMLTemplateElement: require('./HTMLTemplateElement.class.js'),
}


/**
 * Wrapper for HTML `ul` element.
 * @see https://www.w3.org/TR/html/grouping-content.html#htmlulistelement-htmlulistelement
 * @extends xjs.HTMLElement
 */
xjs.HTMLUListElement = class extends xjs.HTMLElement {
  /**
   * @summary Construct a new xjs.HTMLUListElement object.
   * @param {HTMLUListElement} node the node to wrap
   */
  constructor(node) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   * @type {HTMLUListElement}
   */
  get node() { return super.node }

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
   * new xjs.HTMLUListElement(document.querySelector('ul'))
   *   .populate(data, function (f, d, o) {
   *     f.querySelector('a').href        = d.url
   *     f.querySelector('a').textContent = d.text
   *   })
   * new xjs.HTMLUListElement(document.querySelector('ul'))
   *  .populate(data, function (f, d, o) {
   *    // some code involving `this`
   *  }, other_context)
   *
   * @param   {Array} dataset any array of things
   * @param   {xjs.HTMLTemplateElement~RenderingFunction=} renderer a typical rendering function
   * @param   {?Object=} this_arg provide a `this` context to the rendering function
   * @param   {!Object=} options additional rendering options for all items
   * @todo WARNING: in the next breaking release (v5), the order of params will be: `dataset`, `renderer`, `options`, `this_arg`
   * @todo WARNING: in the next breaking release (v5), param `renderer` will be required
   * @returns {xjs.HTMLUListElement} `this`
   * @throws  {ReferenceError} if this `<ul>` does not contain a `<template>`,
   *                           or if that `<template>` does not contain exactly 1 `<li>`.
   */
  populate(dataset, renderer = (f,d,o) => {}, this_arg = this, options = {}) {
    let template = this.node.querySelector('template')
    if (template===null) {
      throw new ReferenceError('This <ul> does not have a <template> descendant.')
    }
    if (template.content.children.length !== 1 || !template.content.children[0].matches('li')) {
      throw new ReferenceError('The <template> must contain exactly 1 element, which must be an <li>.')
    }
    let component = new xjs.HTMLTemplateElement(template).setRenderer(renderer)
    return this.append(...dataset.map((data) => component.render(data, this_arg, options))) // TODO: in the next breaking release, fix order of params
  }
}

module.exports = xjs.HTMLUListElement
