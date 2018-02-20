const xjs = {
  HTMLListElement: require('./HTMLListElement.class.js'),
}

/**
 * Wrapper for HTML `ul` element.
 * @see https://www.w3.org/TR/html/grouping-content.html#htmlulistelement-htmlulistelement
 * @extends xjs.HTMLListElement
 */
xjs.HTMLUListElement = class extends xjs.HTMLListElement {
  /**
   * @summary Construct a new xjs.HTMLUListElement object.
   * @version EXPERIMENTAL
   * @param {HTMLUListElement} node the node to wrap
   */
  constructor(node) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   * @type {HTMLUListElement}
   */
  get node() { return super.node }
}

module.exports = xjs.HTMLUListElement
