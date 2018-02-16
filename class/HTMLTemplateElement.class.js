const fs = require('fs')
const util = require('util')

const jsdom = require('jsdom')

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


  /**
   * @summary Read an HTML file and return the first `<template>` element found while walking the DOM tree.
   * @description The `<template>` element will be wrapped in an `xjs.HTMLTemplate` object.
   * To access the actual element, call {@link xjs.HTMLTemplateElement#node}.
   * @param   {string} filepath the path to the file
   * @returns {HTMLTemplateElement} the first found `<template>` descendant
   * @throws  {ReferenceError} if there is no `<template>` descendant
   */
  static async fromFile(filepath) {
    let data = await util.promisify(fs.readFile)(filepath, 'utf8')
    return xjs.HTMLTemplateElement._fromFile_process(filepath, data)
  }
  /**
   * @summary Synchronous version of {@link HTMLTemplateElement.fromFile}.
   * @param   {string} filepath the path to the file
   * @returns {xjs.HTMLTemplateElement} the first found `<template>` descendant, wrapped
   * @throws  {ReferenceError} if there is no `<template>` descendant
   */
  static fromFileSync(filepath) {
    let data = fs.readFileSync(filepath, 'utf8')
    return xjs.HTMLTemplateElement._fromFile_process(filepath, data)
  }
  /**
   * @summary Internall processing for {@link xjs.HTMLTemplateElement.fromFile|.fromFile{,Sync}}.
   * @param   {string} filepath the path to the file
   * @param   {string} data the result of fs.readFile{,Sync}
   * @returns {xjs.HTMLTemplateElement} the first found `<template>` descendant, wrapped
   * @throws  {ReferenceError} if there is no `<template>` descendant
   */
  static _fromFile_process(filepath, data) {
    let elem = jsdom.JSDOM.fragment(data).querySelector('template')
    if (elem === null) {
      throw new ReferenceError(`No template element was found in file: ${filepath}`)
    }
    return new xjs.HTMLTemplateElement(elem)
  }
}

module.exports = xjs.HTMLTemplateElement
