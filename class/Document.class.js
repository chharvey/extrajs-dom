const path = require('path')

const xjs = {
  Node: require('./Node.class.js'),
  HTMLTemplateElement: require('./HTMLTemplateElement.class.js'),
}

/**
 * Wrapper for a DocumentFragment.
 * @see https://www.w3.org/TR/dom/#document
 * @extends xjs.Node
 */
xjs.Document = class extends xjs.Node {
  /**
   * @summary Construct a new xjs.Document object.
   * @version EXPERIMENTAL
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

/**
 * @summary A set of component builders.
 * @namespace
 */
xjs.Document.TEMPLATES = {
  /**
   * @summary A website’s sitemap, in the form of a document outline.
   * @description An `<ol role="directory">` with link list items to subpages.
   * @version EXPERIMENTAL
   * @see /tpl/x-sitemap.tpl.js
   * @type {xjs.HTMLTemplateElement}
   */
  xSitemap: new xjs.HTMLTemplateElement(
    xjs.HTMLTemplateElement.readTemplateFileSync(path.join(__dirname, '../tpl/x-sitemap.tpl.html'))
  ).setRenderer(require('../tpl/x-sitemap.tpl.js')),
}

module.exports = xjs.Document
