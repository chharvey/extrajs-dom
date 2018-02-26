const xjs = {
  HTMLElement: require('./HTMLElement.class.js'),
}

/**
 * Wrapper for HTML `dl` element.
 * @see https://www.w3.org/TR/html/grouping-content.html#htmldlistelement-htmldlistelement
 * @extends xjs.HTMLElement
 */
xjs.HTMLDListElement = class extends xjs.HTMLElement {
  /**
   * @summary Construct a new xjs.HTMLDListElement object.
   * @param {HTMLDListElement} node the node to wrap
   */
  constructor(node) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   * @type {HTMLDListElement}
   */
  get node() { return super.node }
}

module.exports = xjs.HTMLDListElement
