const xjs = {
  HTMLElement: require('./HTMLElement.class.js'),
}

/**
 * Wrapper for HTML `<meta>` element.
 * @see https://www.w3.org/TR/html52/document-metadata.html#htmlmetaelement
 * @extends xjs.HTMLElement
 */
xjs.HTMLMetaElement = class extends xjs.HTMLElement {
  /**
   * @summary Construct a new xjs.HTMLMetaElement object.
   * @param {HTMLMetaElement} node the node to wrap
   */
  constructor(node) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   * @type {HTMLMetaElement}
   */
  get node() { return super.node }

  /**
   * @summary Reflect the `name` content attribute.
   * @see https://www.w3.org/TR/html52/document-metadata.html#dom-htmlmetaelement-name
   * @param   {string=} val the value to set
   * @returns {(xjs.HTMLMetaElement|string)} `this` if setting the attribute, else the value of the attribute
   */
  name(val) {
    return this.attr('name', val)
  }

  /**
   * @summary Reflect the `content` content attribute.
   * @see https://www.w3.org/TR/html52/document-metadata.html#dom-htmlmetaelement-content
   * @param   {string=} val the value to set
   * @returns {(xjs.HTMLMetaElement|string)} `this` if setting the attribute, else the value of the attribute
   */
  content(val) {
    return this.attr('content', val)
  }
}

module.exports = xjs.HTMLMetaElement
