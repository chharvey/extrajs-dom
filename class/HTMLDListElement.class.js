const HTMLElement = require('../src/HTMLElement.class.js')

/**
 * Represents an HTML DL element.
 * @see https://www.w3.org/TR/html/grouping-content.html#htmldlistelement-htmldlistelement
 * @extends HTMLElement
 */
class HTMLDListElement extends HTMLElement {
  /**
   * @summary Construct a new HTMLDListElement object.
   * @version EXPERIMENTAL
   */
  constructor() {
    super('dl')
  }
}

module.exports = HTMLDListElement
