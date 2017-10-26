/**
 * Represents a DOM attribute.
 * @see https://w3c.github.io/dom/#attr
 */
class Attr {
  /**
   * Construct a new Attr object.
   * @param {!Object} names an object defining the name of this attribute
   * @param {string} names.local_name this attribute’s local name
   * @param {string} value the value of this attribute
   * @param {?Element=} element the element on which this attribute is set
   */
  constructor({local_name}, value, element=null) {
    /**
     * The local name of this attribute.
     * @private
     * @final
     * @type {string}
     */
    this._LOCALNAME = names.local_name

    /**
     * The value of this attribute.
     * @private
     * @type {string}
     */
    this._value = value

    /**
     * The element to which this attribute belongs.
     * @private
     * @type {?Element}
     */
    this._element = element
  }


  /**
   * The local name of this attribute.
   * @see https://w3c.github.io/dom/#dom-attr-localname
   * @type {string}
   */
  get localName() { return this._LOCALNAME }

  /**
   * The value of this attribute.
   * @see https://w3c.github.io/dom/#dom-attr-value
   * @type {string}
   */
  get value() { return this._value }

  /**
   * The element that owns this attribute.
   * @see https://w3c.github.io/dom/#dom-attr-ownerelement
   * @type {?Element}
   */
  get ownerElement() { return this._element }


  /**
   * @summary Set the value of this attribute.
   * @see https://w3c.github.io/dom/#set-an-existing-attribute-value
   * @param {string} value the value to set
   */
  set value(value) {
    if (this.ownerElement === null) this._value = value
    else this.ownerElement.changeAttribute(this, value)
    else (function () {
      // 1. Queue a mutation record of "attributes" with:
      //    {
      //      name     : this.localName,
      //      oldValue : this.value,
      //    }
    }).call(this)
  }

  /**
   * @summary Set the owner element of this attribute.
   * @param {?Element} element the element that owns this attribute, or `null`
   */
  set ownerElement(element) {
    this._element = element
  }
}

module.exports = Attr
