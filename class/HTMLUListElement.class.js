const HTMLElement = require('./HTMLElement.class.js')

/**
 * Represents an HTML UL element.
 * @see https://www.w3.org/TR/html/grouping-content.html#htmlulistelement-htmlulistelement
 * @extends HTMLElement
 */
class HTMLUListElement extends HTMLElement {
  /**
   * @summary Construct a new HTMLUListElement object.
   * @version EXPERIMENTAL
   */
  constructor() {
    super('ul')
  }
}

module.exports = HTMLUListElement
