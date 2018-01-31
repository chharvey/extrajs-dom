const xjs = {
  HTMLElement: require('./HTMLElement.class.js'),
}

/**
 * Wrapper for HTML `ol` element.
 * @see https://www.w3.org/TR/html/grouping-content.html#htmlolistelement-htmlolistelement
 * @extends xjs.HTMLElement
 */
xjs.HTMLOListElement = class extends xjs.HTMLElement {
  /**
   * @summary Construct a new xjs.HTMLOListElement object.
   * @version EXPERIMENTAL
   * @param {HTMLOListElement} node the node to wrap
   */
  constructor(node) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   * @type {HTMLOListElement}
   */
  get node() { return super.node }
}

module.exports = xjs.HTMLOListElement
