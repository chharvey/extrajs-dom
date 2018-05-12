const xjs = {
  DocumentFragment: require('./DocumentFragment.class.js'),
  HTMLElement: require('./HTMLElement.class.js'),
  HTMLTemplateElement: require('./HTMLTemplateElement.class.js'),
}


/**
 * Wrapper for HTML `ol` element.
 * @see https://www.w3.org/TR/html/grouping-content.html#htmlolistelement-htmlolistelement
 * @extends xjs.HTMLElement
 */
xjs.HTMLOListElement = class extends xjs.HTMLElement {
  /**
   * @summary Construct a new xjs.HTMLOListElement object.
   * @param {HTMLOListElement} node the node to wrap
   */
  constructor(node) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   * @type {HTMLOListElement}
   */
  get node() { return super.node }

  /**
   * @summary Populate this list with items containing data.
   * @description This method appends items to the end of this list.
   * The items are the result of rendering the given data.
   * In order to determine how the data is rendered, this `<ol>` element must have
   * a `<template>` child, which in turn has a single child that is an `<li>`.
   *
   * Notes:
   * - This element may contain multiple `<template>` children, but this method uses only the first one.
   * - This element may also already have any number of `<li>` children; they are not affected.
   *
   * @example
   * let {document} = new jsdom.JSDOM(`
   * <ol>
   *   <template>
   *     <li>
   *       <a href="{{ url }}">{{ text }}</a>
   *     </li>
   *   </template>
   * </ol>
   * `).window
   * let data = [
   *   { "url": "#0", "text": "Career Connections" },
   *   { "url": "#1", "text": "Getting Licensed & Certified" },
   *   { "url": "#2", "text": "Career resources" },
   *   { "url": "#3", "text": "Code of Ethics" }
   * ]
   * new xjs.HTMLOListElement(document.querySelector('ol'))
   *   .populate(data, function (f, d) {
   *     f.querySelector('a').href        = d.url
   *     f.querySelector('a').textContent = d.text
   *   })
   * new xjs.HTMLOListElement(document.querySelector('ol'))
   *  .populate(data, function (f, d) {
   *    // some code involving `this`
   *  }, other_context)
   *
   * @param   {Array} dataset any array of things
   * @param   {xjs.HTMLTemplateElement~RenderingFunction=} renderer a typical rendering function
   * @param   {!Object=} options additional rendering options for all items
   * @param   {?Object=} this_arg provide a `this` context to the rendering function
   * @returns {xjs.HTMLOListElement} `this`
   * @throws  {ReferenceError} if this `<ol>` does not contain a `<template>`,
   *                           or if that `<template>` does not contain exactly 1 `<li>`.
   */
  populate(dataset, renderer = (f,d,o) => {}, options = {}, this_arg = this) {
    let template = this.node.querySelector('template')
    if (template===null) {
      throw new ReferenceError('This <ol> does not have a <template> descendant.')
    }
    if (template.content.children.length !== 1 || !template.content.children[0].matches('li')) {
      throw new ReferenceError('The <template> must contain exactly 1 element, which must be an <li>.')
    }
    let component = new xjs.HTMLTemplateElement(template).setRenderer(renderer)
    return this.append(...dataset.map((data) => component.render(data, options, this_arg)))
  }
}

module.exports = xjs.HTMLOListElement
