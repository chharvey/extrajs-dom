/**
 * Represents a list of attributes belonging to an element.
 * @see https://w3c.github.io/dom/#namednodemap
 */
class NamedNodeMap {
  /**
   * Construct a new NamedNodeMap object.
   * @param {Element} element the element associated with this named node map
   */
  constructor() {
    // /**
    //  * The element associated with this named node map.
    //  * @private
    //  * @final
    //  * @type {string}
    //  */
    // this._ELEMENT = element

    /**
     * This named node map’s attribute list.
     * @private
     * @final
     * @type {Array<Attr>}
     */
    this._ATTRIBUTE_LIST = []
  }
}

module.exports = NamedNodeMap
