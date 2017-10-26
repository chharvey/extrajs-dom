const HTMLElement = require('./HTMLElement.class.js')

/**
 * Represents an HTML OL element.
 * @see https://www.w3.org/TR/html/grouping-content.html#htmlolistelement-htmlolistelement
 * @extends HTMLElement
 */
class HTMLOListElement extends HTMLElement {
  /**
   * @summary Construct a new HTMLOListElement object.
   * @version EXPERIMENTAL
   */
  constructor() {
    super('ol')
  }
}

module.exports = HTMLOListElement
