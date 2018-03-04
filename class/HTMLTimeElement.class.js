const xjs = {
  HTMLElement: require('./HTMLElement.class.js'),
}

/**
 * Wrapper for HTML `<time>` element.
 * @see https://www.w3.org/TR/html52/textlevel-semantics.html#htmltimeelement
 * @extends xjs.HTMLElement
 */
xjs.HTMLTimeElement = class extends xjs.HTMLElement {
  /**
   * @summary Construct a new xjs.HTMLTimeElement object.
   * @param {HTMLTimeElement} node the node to wrap
   */
  constructor(node) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   * @type {HTMLTimeElement}
   */
  get node() { return super.node }

  /**
   * @summary Reflect the `datetime` content attribute.
   * @description This method accepts {@link Date} objects when setting. When getting, it will always return a string.
   * @see https://www.w3.org/TR/html52/textlevel-semantics.html#dom-htmltimeelement-datetime
   * @param   {(xjs.Element~ValueArg|Date)=} val the value to set
   * @returns {(xjs.HTMLTimeElement|?string)} `this` if setting the attribute, else the value of the attribute (or `null` if it hasn’t been set)
   */
  dateTime(val) {
    return this.attr('datetime', (val instanceof Date) ? val.toISOString() : val)
  }
}

module.exports = xjs.HTMLTimeElement
