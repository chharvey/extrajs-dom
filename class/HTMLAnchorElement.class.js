const HTMLElement = require('./HTMLElement.class.js')

/**
 * An HTML A element.
 * @see https://html.spec.whatwg.org/#htmlanchorelement
 * @extends HTMLElement
 */
class HTMLAnchorElement extends HTMLElement {
  /**
   * @summary Construct a new HTMLAnchorElement object.
   * @version EXPERIMENTAL
   */
  constructor() {
    super('a')
  }

  href(url) {
    return this.attr('href', url)
  }
}

module.exports = HTMLAnchorElement
