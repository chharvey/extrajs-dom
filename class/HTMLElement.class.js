const Element = require('../src/Element.class.js')

/**
 * Represents an HTML element.
 * @see https://www.w3.org/TR/html/dom.html#htmlelement-htmlelement
 * @extends Element
 */
class HTMLElement extends Element {
  /**
   * @summary Construct a new HTMLElement object.
   * @description The voidness of this element is automatically determined for “Void Elements” as in
   * {@link https://www.w3.org/TR/html/syntax.html#void-elements|the HTML specification}.
   * @version EXPERIMENTAL
   * @param {string} name the immutable name of the tag
   */
  constructor(name) {
    super(name, [
      'area',
      'base',
      'br',
      'col',
      'embed',
      'hr',
      'img',
      'input',
      'keygen',
      'link',
      'menuitem',
      'meta',
      'param',
      'source',
      'track',
      'wbr',
    ].includes(name))
  }
}

module.exports = HTMLElement
