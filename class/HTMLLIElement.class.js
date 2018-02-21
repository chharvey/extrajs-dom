const xjs = {
  HTMLElement: require('./HTMLElement.class.js'),
}

/**
 * Wrapper for HTML `li` element.
 * @see https://www.w3.org/TR/html/grouping-content.html#htmllielement-htmllielement
 * @extends xjs.HTMLElement
 */
xjs.HTMLLIElement = class extends xjs.HTMLElement {
  /**
   * @summary Construct a new xjs.HTMLLIElement object.
   * @param {HTMLLIElement} node the node to wrap
   */
  constructor(node) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   * @type {HTMLLIElement}
   */
  get node() { return super.node }
}

module.exports = xjs.HTMLLIElement
