const Element = require('../src/Element.class.js')

/**
 * Represents an HTML LI element.
 * @see https://www.w3.org/TR/html/grouping-content.html#htmllielement-htmllielement
 * @extends Element
 */
class HTMLLIElement extends Element {
  /**
   * @summary Construct a new HTMLLIElement object.
   * @version EXPERIMENTAL
   */
  constructor() {
    super('li')
  }
}

module.exports = HTMLLIElement
