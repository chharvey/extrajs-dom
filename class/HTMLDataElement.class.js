const xjs = {
  HTMLElement: require('./HTMLElement.class.js'),
}

/**
 * Wrapper for HTML `<data>` element.
 * @see https://www.w3.org/TR/html52/textlevel-semantics.html#the-data-element
 * @extends xjs.HTMLElement
 */
xjs.HTMLDataElement = class extends xjs.HTMLElement {
  /**
   * @summary Construct a new xjs.HTMLDataElement object.
   * @param {HTMLDataElement} node the node to wrap
   */
  constructor(node) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   * @type {HTMLDataElement}
   */
  get node() { return super.node }

  /**
   * @summary Reflect the `value` content attribute.
   * @see https://www.w3.org/TR/html52/textlevel-semantics.html#dom-htmldataelement-value
   * @param   {xjs.Element~ValueArg=} val the value to set
   * @param   {*=} this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns {(xjs.HTMLDataElement|?string)} `this` if setting the attribute, else the value of the attribute (or `null` if it hasn’t been set)
   */
  value(val, this_arg = this) { return this.attr('value', val, this_arg) }
}

module.exports = xjs.HTMLDataElement
