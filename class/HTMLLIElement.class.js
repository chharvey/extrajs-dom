const HTMLElement = require('./HTMLElement.class.js')

/**
 * Represents an HTML LI element.
 * @see https://www.w3.org/TR/html/grouping-content.html#htmllielement-htmllielement
 * @extends HTMLElement
 */
class HTMLLIElement extends HTMLElement {
  /**
   * @summary Construct a new HTMLLIElement object.
   * @version EXPERIMENTAL
   */
  constructor() {
    super('li')
  }
}

module.exports = HTMLLIElement
