const xjs = {
  Node: require('./Node.class.js'),
}

/**
 * Wrapper for a DocumentFragment.
 * @see https://www.w3.org/TR/dom/#document
 * @extends xjs.Node
 */
xjs.Document = class extends xjs.Node {
  /**
   * @summary Construct a new xjs.Document object.
   * @param {Document} node the node to wrap
   */
  constructor(node) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   * @type {Document}
   */
  get node() { return super.node }
}

module.exports = xjs.Document
