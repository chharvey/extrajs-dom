const Element = require('../src/Element.class.js')

/**
 * Represents an HTML UL element.
 * @see https://www.w3.org/TR/html/grouping-content.html#htmlulistelement-htmlulistelement
 * @extends Element
 */
class HTMLUListElement extends Element {
  /**
   * @summary Construct a new HTMLUListElement object.
   * @version EXPERIMENTAL
   */
  constructor() {
    super('ul')
  }
}

module.exports = HTMLUListElement
