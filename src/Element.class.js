const xjs          = require('extrajs')
const ObjectString = require('./ObjectString.class.js')
const View         = require('extrajs-view')

/**
 * Represents a DOM element.
 * @see https://www.w3.org/TR/dom/#element
 */
class Element {
  /**
   * @summary Construct a new Element object.
   */
  constructor(name, is_void = false) {
    /** @private @final */ this._NAME = name
  }


  /**
   * @summary Add (or modify) one or more attributes, given strings.
   * @description Strings must take the form `'attribute="attr value"'`.
   * Multiple arguments may be provided.
   * This method does not remove attributes.
   *
   * Move to Element#attr if needed:
   *   Note you can also use the method {@link Element#attrStr}
   *   if you have strings and are not removing any attributes:
   *   `my_elem.attrStr('itemscope=""', 'itemtype="Thing"')`.
   *
   * @example
   * this.attr('itemprop','name').attr('itemscope','').attr('itemtype':'Person') // old
   * this.attrStr('itemprop="name"', 'itemscope=""', 'itemtype="Person"')        // new
   * this.attrStr() // do nothing; return `this`
   *
   * @param   {...string} attr_str a string of the format `'attribute="attr value"'`
   * @returns {Element} `this`
   */
  attrStr(...attr_str) {
    attr_str.forEach((str) => this.attr(str.split('=')[0], str.split('=')[1].slice(1,-1)))
    return this
  }


}

module.exports = Element
