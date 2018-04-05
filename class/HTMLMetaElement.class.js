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
   * @param   {xjs.Element~ValueArg=} val the value to set
   * @param   {*=} this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns {(xjs.HTMLMetaElement|?string)} `this` if setting the attribute, else the value of the attribute (or `null` if it hasn’t been set)
   */
  name(val, this_arg = this) { return this.attr('name', val, this_arg) }

  /**
   * @summary Reflect the `content` content attribute.
   * @see https://www.w3.org/TR/html52/document-metadata.html#dom-htmlmetaelement-content
   * @param   {xjs.Element~ValueArg=} val the value to set
   * @param   {*=} this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns {(xjs.HTMLMetaElement|?string)} `this` if setting the attribute, else the value of the attribute (or `null` if it hasn’t been set)
   */
  content(val, this_arg = this) { return this.attr('content', val, this_arg) }
}

module.exports = xjs.HTMLMetaElement
