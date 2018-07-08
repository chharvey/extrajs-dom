const URL = require('url').URL
const xjs = {
  HTMLElement: require('../dist/class/HTMLElement.class.js').default,
}

/**
 * Wrapper for HTML `a` element.
 * @see https://www.w3.org/TR/html52/textlevel-semantics.html#htmlanchorelement
 * @extends xjs.HTMLElement
 */
xjs.HTMLAnchorElement = class extends xjs.HTMLElement {
  /**
   * @summary Construct a new xjs.HTMLAnchorElement object.
   * @param {HTMLAnchorElement} node the node to wrap
   */
  constructor(node) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   * @type {HTMLAnchorElement}
   */
  get node() { return super.node }

  /**
   * @summary Reflect the `href` content attribute.
   * @see https://www.w3.org/TR/html52/links.html#dom-htmlhyperlinkelementutils-href
   * @param   {xjs.Element~ValueArg=} val the value to set
   * @param   {*=} this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns {(xjs.HTMLAnchorElement|?string)} `this` if setting the attribute, else the value of the attribute (or `null` if it hasn’t been set)
   */
  href(val, this_arg = this) { return this.attr('href', val, this_arg) }

  /**
   * @summary Reflect the `target` content attribute.
   * @see https://www.w3.org/TR/html52/textlevel-semantics.html#dom-htmlanchorelement-target
   * @param   {xjs.Element~ValueArg=} val the value to set
   * @param   {*=} this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns {(xjs.HTMLAnchorElement|?string)} `this` if setting the attribute, else the value of the attribute (or `null` if it hasn’t been set)
   */
  target(val, this_arg = this) { return this.attr('target', val, this_arg) }

  /**
   * @summary Reflect the `download` content attribute.
   * @see https://www.w3.org/TR/html52/textlevel-semantics.html#dom-htmlanchorelement-download
   * @param   {xjs.Element~ValueArg=} val the value to set
   * @param   {*=} this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns {(xjs.HTMLAnchorElement|?string)} `this` if setting the attribute, else the value of the attribute (or `null` if it hasn’t been set)
   */
  download(val, this_arg = this) { return this.attr('download', val, this_arg) }

  /**
   * @summary Reflect the `rel` content attribute.
   * @see https://www.w3.org/TR/html52/textlevel-semantics.html#dom-htmlanchorelement-rel
   * @param   {xjs.Element~ValueArg=} val the value to set
   * @param   {*=} this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns {(xjs.HTMLAnchorElement|?string)} `this` if setting the attribute, else the value of the attribute (or `null` if it hasn’t been set)
   */
  rel(val, this_arg = this) { return this.attr('rel', val, this_arg) }

  /**
   * @summary Reflect the `rev` content attribute.
   * @see https://www.w3.org/TR/html52/textlevel-semantics.html#dom-htmlanchorelement-rev
   * @param   {xjs.Element~ValueArg=} val the value to set
   * @param   {*=} this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns {(xjs.HTMLAnchorElement|?string)} `this` if setting the attribute, else the value of the attribute (or `null` if it hasn’t been set)
   */
  rev(val, this_arg = this) { return this.attr('rel', val, this_arg) }

  /**
   * @summary Reflect the `hreflang` content attribute.
   * @see https://www.w3.org/TR/html52/textlevel-semantics.html#dom-htmlanchorelement-hreflang
   * @param   {xjs.Element~ValueArg=} val the value to set
   * @param   {*=} this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns {(xjs.HTMLAnchorElement|?string)} `this` if setting the attribute, else the value of the attribute (or `null` if it hasn’t been set)
   */
  hreflang(val, this_arg = this) { return this.attr('hreflang', val, this_arg) }

  /**
   * @summary Reflect the `type` content attribute.
   * @see https://www.w3.org/TR/html52/textlevel-semantics.html#dom-htmlanchorelement-type
   * @param   {xjs.Element~ValueArg=} val the value to set
   * @param   {*=} this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns {(xjs.HTMLAnchorElement|?string)} `this` if setting the attribute, else the value of the attribute (or `null` if it hasn’t been set)
   */
  type(val, this_arg = this) { return this.attr('type', val, this_arg) }
}

module.exports = xjs.HTMLAnchorElement
