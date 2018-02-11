const xjs = {
  HTMLElement: require('./HTMLElement.class.js'),
}

/**
 * Wrapper for HTML `template` element.
 * @see https://www.w3.org/TR/html52/semantics-scripting.html#htmltemplateelement
 * @version EXPERIMENTAL
 */
xjs.HTMLTemplateElement = class extends xjs.HTMLElement {
  /**
   * @summary Construct a new xjs.HTMLTemplateElement object.
   * @param {HTMLTemplateElement} node the node to wrap
   */
  constructor(node) {
    super(node)

    /**
     * @summary The rendering function added to this wrapper.
     * @param   {DocumentFragment} f a document fragment
     * @param   {*} d data
     * @returns {DocumentFragment} the modified document fragment
     */
    this._renderer = (f, d) => f
  }
  /**
   * @summary This wrapper’s node.
   * @type {HTMLTemplateElement}
   */
  get node() { return super.node }

  /**
   * @summary Return the `<template>` element’s template contents.
   * @see https://www.w3.org/TR/html52/semantics-scripting.html#dom-htmltemplateelement-content
   * @returns {DocumentFragment} this element’s template contents
   */
  content() { return this.node.content }

  /**
   * @summary Set this template’s rendering function.
   * @description The argument must be a rendering function with the signature `function (frag, data) => frag`.
   * The function must take a document fragment and any data, and optionally modify the fragment using the data.
   * It should not have a `this` context, and it should not have a return value.
   * @param   {function(DocumentFragment, *)} renderer modifies the template by filling it in with data
   * @returns {xjs.HTMLTemplateElement} `this`
   */
  setRenderer(renderer) {
    this._renderer = renderer
    return this
  }

  /**
   * @summary Render this template with some data.
   * @param   {*=} data the data to fill
   * @returns {DocumentFragment} the rendered output
   */
  render(data) {
    let frag = this.content().cloneNode(true)
    this._renderer.call(null, frag, data)
    return frag
  }
}

module.exports = xjs.HTMLTemplateElement
