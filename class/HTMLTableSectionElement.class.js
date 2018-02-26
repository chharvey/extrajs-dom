const jsdom = require('jsdom')

const xjs = {
  DocumentFragment: require('./DocumentFragment.class.js'),
  HTMLElement: require('./HTMLElement.class.js'),
  HTMLTemplateElement: require('./HTMLTemplateElement.class.js'),
}


/**
 * Wrapper for HTML `thead`, `tfoot`, and `tbody` elements.
 * @see https://www.w3.org/TR/html/tabular-data.html#htmltablesectionelement
 * @extends xjs.HTMLElement
 */
xjs.HTMLTableSectionElement = class extends xjs.HTMLElement {
  /**
   * @summary Construct a new xjs.HTMLTableSectionElement object.
   * @version EXPERIMENTAL
   * @param {HTMLTableSectionElement} node the node to wrap
   */
  constructor(node) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   * @type {HTMLTableSectionElement}
   */
  get node() { return super.node }

  /**
   * @summary Populate this list with items containing data.
   * @description This method appends items to the end of this list.
   * The items are the result of rendering the given data.
   * In order to determine how the data is rendered, this `<thead/tfoot/tbody>` element must have
   * a `<template>` child, which in turn has a single child that is an `<tr>`.
   *
   * Notes:
   * - This element may contain multiple `<template>` children, but this method uses only the first one.
   * - This element may also already have any number of `<tr>` children; they are not affected.
   *
   * @example
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
   * new xjs.HTMLTableSectionElement(document.querySelector('tbody'))
   *   .populate(data, function (f, d) {
   *     f.querySelectorAll('td')[0].textContent = d.url
   *     f.querySelectorAll('td')[1].textContent = d.text
   *   })
   *
   * @param   {Array} data any array of things
   * @param   {xjs.HTMLTemplateElement~RenderingFunction=} renderer a typical rendering function
   * @throws  {ReferenceError} if this `<thead/tfoot/tbody>` does not contain a `<template>`,
   *                           or if that `<template>` does not contain exactly 1 `<tr>`.
   * @returns {xjs.HTMLTableSectionElement} `this`
   */
  populate(data, renderer = (f,d) => {}) {
    let template = this.node.querySelector('template')
    if (template===null) {
      throw new ReferenceError('This <thead/tfoot/tbody> does not have a <template> descendant.')
    }
    if (template.content.children.length !== 1 || !template.content.children[0].matches('tr')) {
      throw new ReferenceError('The <template> must contain exactly 1 element, which must be a <tr>.')
    }
    let component = new xjs.HTMLTemplateElement(template).setRenderer(renderer)
    return this.append(
      new xjs.DocumentFragment(jsdom.JSDOM.fragment(''))
        .append(...data.map((datum) => component.render(datum)))
    )
  }
}

module.exports = xjs.HTMLTableSectionElement
