const jsdom = require('jsdom')

const xjs = {
  DocumentFragment: require('./DocumentFragment.class.js'),
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
   * @version EXPERIMENTAL
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
   * <ul class="list">
   *   <template>
   *     <li class="list-item">
   *       <a class="list-link" href="{{ url }}" itemprop="significantLink">{{ text }}</a>
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
   * new xjs.HTMLListElement(document.querySelector('ul.list'))
   *   .populate(data, function (f, d) {
   *     f.querySelector('.list-link').href        = d.url
   *     f.querySelector('.list-link').textContent = d.text
   *   })
   *
   * @param   {Array} data any array of things
   * @param   {xjs.HTMLTemplateElement~RenderingFunction=} renderer a typical rendering function
   * @throws  {ReferenceError} if this `<ul>` does not contain a `<template>`,
   *                           or if that `<template>` does not contain exactly 1 `<li>`.
   * @returns {xjs.HTMLListElement} `this`
   */
  populate(data, renderer = (f,d) => {}) {
    let template = this.node.querySelector('template')
    if (template===null) {
      throw new ReferenceError('This <ul> does not have a <template> descendant.')
    }
    if (template.content.children.length !== 1 || !template.content.children[0].matches('li')) {
      throw new ReferenceError('The <template> must contain exactly 1 element, which must be an <li>.')
    }
    let component = new xjs.HTMLTemplateElement(template).setRenderer(renderer)
    return this.append(
      new xjs.DocumentFragment(jsdom.JSDOM.fragment(''))
        .append(...data.map((datum) => component.render(datum)))
    )
  }
}

module.exports = xjs.HTMLUListElement
