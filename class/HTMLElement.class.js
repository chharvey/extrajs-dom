const Element = require('../src/Element.class.js')

/**
 * Represents an HTML element.
 * @see https://www.w3.org/TR/html/dom.html#htmlelement-htmlelement
 * @extends Element
 */
class HTMLElement extends Element {
  /**
   * @summary Construct a new HTMLElement object.
   * @description By default, the parameter `is_void` is true for “Void Elements” as in
   * the HTML specification (and thus the argument need not be explicilty provided).
   * Otherwise, `is_void` is false by default, unless explicitly specified.
   * @see https://www.w3.org/TR/html/syntax.html#void-elements
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
