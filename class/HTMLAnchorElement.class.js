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
  constructor(baseurl) {
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
    if (this._url && this._url.protocol === 'blob:' && non_relative_flag_set) return;
    else this._setTheURL()
  }


  /**
   * Reflect the `target` content attribute.
   * @see https://html.spec.whatwg.org/multipage/text-level-semantics.html#dom-a-target
   * @param   {string} val the value to set
   * @returns {(HTMLAnchorElement|string)} `this` if setting the attribute, else the value of the attribute
   */
  target(val) { return this.attr('target', val) }

  /**
   * Reflect the `download` content attribute.
   * @see https://html.spec.whatwg.org/multipage/text-level-semantics.html#dom-a-download
   * @param   {string} val the value to set
   * @returns {(HTMLAnchorElement|string)} `this` if setting the attribute, else the value of the attribute
   */
  download(val) { return this.attr('download', val) }

  /**
   * Reflect the `ping` content attribute.
   * @see https://html.spec.whatwg.org/multipage/text-level-semantics.html#dom-a-ping
   * @param   {string} val the value to set
   * @returns {(HTMLAnchorElement|string)} `this` if setting the attribute, else the value of the attribute
   */
  ping(val) { return this.attr('ping', val) }

  /**
   * Reflect the `rel` content attribute.
   * @see https://html.spec.whatwg.org/multipage/text-level-semantics.html#dom-a-rel
   * @param   {string} val the value to set
   * @returns {(HTMLAnchorElement|string)} `this` if setting the attribute, else the value of the attribute
   */
  rel(val) { return this.attr('rel', val) }

  /**
   * Reflect the `hreflang` content attribute.
   * @see https://html.spec.whatwg.org/multipage/text-level-semantics.html#dom-a-hreflang
   * @param   {string} val the value to set
   * @returns {(HTMLAnchorElement|string)} `this` if setting the attribute, else the value of the attribute
   */
  hreflang(val) { return this.attr('hreflang', val) }

  /**
   * Reflect the `type` content attribute.
   * @see https://html.spec.whatwg.org/multipage/text-level-semantics.html#dom-a-type
   * @param   {string} val the value to set
   * @returns {(HTMLAnchorElement|string)} `this` if setting the attribute, else the value of the attribute
   */
  type(val) { return this.attr('type', val) }


  /**
   * @summary Set or get this element’s href.
   * @see https://www.w3.org/TR/html/links.html#dom-htmlhyperlinkelementutils-href
   * @param   {string=} url the value to set
   * @returns {(HTMLAnchorElement|URL|string)} `this` if setting the attribute, else URL of this element or the value of its `href` attribute
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

  /**
   * @summary Returns the hyperlink’s URL’s origin.
   * @see https://www.w3.org/TR/html/links.html#dom-htmlhyperlinkelementutils-origin
   * @type {string}
   */
  get origin() {
    this._reinitializeURL()
    return (this._url === null) ? '' : this._url.origin
  }

  /**
   * @summary Returns the hyperlink’s URL’s scheme.
   * @see https://www.w3.org/TR/html/links.html#dom-htmlhyperlinkelementutils-protocol
   * @type {[type]}
   */
  get protocol() {}
  /**
   * @summary Can be set, to change the URL’s scheme.
   * @param {[type]} [description]
   */
  set protocol() {}

  /**
   * @summary Returns the hyperlink’s URL’s username.
   * @see https://www.w3.org/TR/html/links.html#dom-htmlhyperlinkelementutils-username
   * @type {[type]}
   */
  get username() {}
  /**
   * @summary Can be set, to change the URL’s username.
   * @param {[type]} [description]
   */
  set username() {}

  /**
   * @summary Returns the hyperlink’s URL’s password.
   * @see https://www.w3.org/TR/html/links.html#dom-htmlhyperlinkelementutils-password
   * @type {[type]}
   */
  get password() {}
  /**
   * @summary Can be set, to change the URL’s password.
   * @param {[type]} [description]
   */
  set password() {}

  /**
   * @summary Returns the hyperlink’s URL’s host and port (if different from the default port for the scheme).
   * @see https://www.w3.org/TR/html/links.html#dom-htmlhyperlinkelementutils-host
   * @type {[type]}
   */
  get host() {}
  /**
   * @summary Can be set, to change the URL’s host and port.
   * @param {[type]} [description]
   */
  set host() {}

  /**
   * @summary Returns the hyperlink’s URL’s host.
   * @see https://www.w3.org/TR/html/links.html#dom-htmlhyperlinkelementutils-hostname
   * @type {[type]}
   */
  get hostname() {}
  /**
   * @summary Can be set, to change the URL’s host.
   * @param {[type]} [description]
   */
  set hostname() {}

  /**
   * @summary Returns the hyperlink’s URL’s port.
   * @see https://www.w3.org/TR/html/links.html#dom-htmlhyperlinkelementutils-port
   * @type {[type]}
   */
  get port() {}
  /**
   * @summary Can be set, to change the URL’s port.
   * @param {[type]} [description]
   */
  set port() {}

  /**
   * @summary Returns the hyperlink’s URL’s path.
   * @see https://www.w3.org/TR/html/links.html#dom-htmlhyperlinkelementutils-pathname
   * @type {[type]}
   */
  get pathname() {}
  /**
   * @summary Can be set, to change the URL’s path.
   * @param {[type]} [description]
   */
  set pathname() {}

  /**
   * @summary Returns the hyperlink’s URL’s query (includes leading "?" if non-empty).
   * @see https://www.w3.org/TR/html/links.html#dom-htmlhyperlinkelementutils-search
   * @type {[type]}
   */
  get search() {}
  /**
   * @summary Can be set, to change the URL’s query (ignores leading "?").
   * @param {[type]} [description]
   */
  set search() {}

  /**
   * @summary Returns the hyperlink’s URL’s fragment (includes leading "#" if non-empty).
   * @see https://www.w3.org/TR/html/links.html#dom-htmlhyperlinkelementutils-hash
   * @type {[type]}
   */
  get hash() {}
  /**
   * @summary Can be set, to change the URL’s fragment (ignores leading "#").
   * @param {[type]} [description]
   */
  set hash() {}
}

module.exports = HTMLAnchorElement
