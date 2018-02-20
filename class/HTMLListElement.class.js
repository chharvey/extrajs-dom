const xjs = {
  HTMLElement: require('./HTMLElement.class.js'),
}

/**
 * Abstract Wrapper for HTML `ol` and `ul` elements.
 * @extends xjs.HTMLElement
 */
xjs.HTMLListElement = class extends xjs.HTMLElement {
  /**
   * @summary Construct a new xjs.HTMLListElement object.
   * @version EXPERIMENTAL
   * @param {(HTMLOListElement|HTMLUListElement)} node the node to wrap
   */
  constructor(node) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   * @type {(HTMLOListElement|HTMLUListElement)}
   */
  get node() { return super.node }
}

module.exports = xjs.HTMLListElement
