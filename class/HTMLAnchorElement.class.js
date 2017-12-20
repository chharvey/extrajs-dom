const URL = require('url').URL
const HTMLElement = require('./HTMLElement.class.js')

/**
 * An HTML A element.
 * @see https://www.w3.org/TR/html/textlevel-semantics.html#htmlanchorelement
 * @version EXPERIMENTAL
 * @extends HTMLElement
 */
class HTMLAnchorElement extends HTMLElement {
  /**
   * @summary Construct a new HTMLAnchorElement object.
   * @param {(string|URL)} baseurl TEMP url to use as the base
   */
  constructor(_document) {
    super('a')

    this.baseurl = baseurl // TEMP

    /**
     * The URL of this element.
     * @private
     * @type {?URL}
     */
    this._url = null
  }

  /**
   * @summary Set this element’s url.
   * @private
   * @see https://www.w3.org/TR/html/links.html#set-the-url
   */
  _setTheURL() {
    this._url = (this.attr('href') === undefined) ? null : new URL(this.attr('href'), baseurl || 'https://example.com/')
  }

  /**
   * @summary Reinitialize this element’s url.
   * @private
   * @see https://www.w3.org/TR/html/links.html#reinitialise-url
   */
  _reinitializeURL() {
    let non_relative_flag_set = true // TODO
    if (this._url && this._url.protocol.slice(0,4) === 'blob' && non_relative_flag_set) return;
    else this._setTheURL()
  }

  /**
   * @summary Set or get this element’s href.
   * @see https://www.w3.org/TR/html/links.html#dom-htmlhyperlinkelementutils-href
   * @param   {string=} url the value to set
   * @returns {(Element|URL|string)} `this` if setting the attribute, else URL of this element or the value of its `href` attribute
   */
  href(url) {
    if (arguments.length) {
      return this.attr('href', url)
    } else {
      this._reinitializeURL()
      if (this._url === null) return this.attr('href') || ''
      else return this._url
    }
  }
}

module.exports = HTMLAnchorElement
