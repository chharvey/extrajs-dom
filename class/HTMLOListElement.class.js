const Element = require('../src/Element.class.js')

/**
 * Represents an HTML OL element.
 * @see https://www.w3.org/TR/html/grouping-content.html#htmlolistelement-htmlolistelement
 * @extends Element
 */
class HTMLOListElement extends Element {
  /**
   * @summary Construct a new HTMLOListElement object.
   * @version EXPERIMENTAL
   */
  constructor() {
    super('ol')
  }
}

module.exports = HTMLOListElement
