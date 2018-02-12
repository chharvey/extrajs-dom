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


  /**
   * @summary Return a website’s sitemap, in the form of a document outline.
   * @version EXPERIMENTAL
   * @param   {Array<{name:string, url:string}>} websitedata array of data, each representing a subpage // TODO use sdo.WebPage
   * @returns {HTMLOListElement} an `<ol role="directory">` with link list items to subpages
   */
  static sitemap(websitedata) {
    return xjs.Document.TEMPLATES.xSitemap.render(websitedata).querySelector('ol')
  }
}

xjs.Document.TEMPLATES = {
  xSitemap: new xjs.HTMLTemplateElement(
    xjs.HTMLTemplateElement.readTemplateFileSync(path.join(__dirname, '../tpl/x-sitemap.tpl.html'))
  ).setRenderer(require('../tpl/x-sitemap.tpl.js')),
}

module.exports = xjs.Document
