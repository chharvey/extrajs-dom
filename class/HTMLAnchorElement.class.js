const URL = require('url').URL
const xjs = {
  HTMLElement: require('./HTMLElement.class.js'),
}

/**
 * Wrapper for HTML `a` element.
 * @see https://www.w3.org/TR/html/textlevel-semantics.html#htmlanchorelement
 * @version EXPERIMENTAL
 */
xjs.HTMLAnchorElement = class extends xjs.HTMLElement {
  /**
   * @summary Construct a new xjs.HTMLAnchorElement object.
   * @param {HTMLAnchorElement} node the node to wrap
   */
  constructor(node) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   * @type {HTMLAnchorElement}
   */
  get node() { return super.node }

  /**
   * @summary Reflect the `href` content attribute.
   * @see https://www.w3.org/TR/html52/links.html#element-attrdef-a-href
   * @param   {string=} val the value to set
   * @returns {(xjs.HTMLAnchorElement|string)} `this` if setting the attribute, else the value of the attribute
   */
  href(url) { return this.attr('href', val) }

  /**
   * @summary Reflect the `target` content attribute.
   * @param   {string} val the value to set
   * @returns {(xjs.HTMLAnchorElement|string)} `this` if setting the attribute, else the value of the attribute
   */
  target(val) { return this.attr('target', val) }

  /**
   * @summary Reflect the `download` content attribute.
   * @see https://www.w3.org/TR/html52/textlevel-semantics.html#dom-htmlanchorelement-download
   * @param   {string} val the value to set
   * @returns {(xjs.HTMLAnchorElement|string)} `this` if setting the attribute, else the value of the attribute
   */
  download(val) { return this.attr('download', val) }

  /**
   * @summary Reflect the `rel` content attribute.
   * @see https://www.w3.org/TR/html52/links.html#element-attrdef-a-rel
   * @param   {string} val the value to set
   * @returns {(xjs.HTMLAnchorElement|string)} `this` if setting the attribute, else the value of the attribute
   */
  rel(val) { return this.attr('rel', val) }

  /**
   * @summary Reflect the `rev` content attribute.
   * @see https://www.w3.org/TR/html52/links.html#element-attrdef-a-rev
   * @param   {string} val the value to set
   * @returns {(xjs.HTMLAnchorElement|string)} `this` if setting the attribute, else the value of the attribute
   */
  rev(val) { return this.attr('rel', val) }

  /**
   * @summary Reflect the `hreflang` content attribute.
   * @param   {string} val the value to set
   * @returns {(xjs.HTMLAnchorElement|string)} `this` if setting the attribute, else the value of the attribute
   */
  hreflang(val) { return this.attr('hreflang', val) }

  /**
   * @summary Reflect the `type` content attribute.
   * @param   {string} val the value to set
   * @returns {(xjs.HTMLAnchorElement|string)} `this` if setting the attribute, else the value of the attribute
   */
  type(val) { return this.attr('type', val) }
}

module.exports = xjs.HTMLAnchorElement
