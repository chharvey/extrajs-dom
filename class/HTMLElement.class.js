const xjs = {
  Element: require('./Element.class.js'),
}

/**
 * Wrapper for an HTML element.
 * @see https://www.w3.org/TR/html/dom.html#htmlelement
 * @extends xjs.Element
 */
xjs.HTMLElement = class extends xjs.Element {
  /**
   * @summary Construct a new xjs.HTMLElement object.
   * @param {HTMLElement} node the node to wrap
   */
  constructor(node) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   * @type {HTMLElement}
   */
  get node() { return super.node }

  ////////////////////
  // GLOBAL ATTRIBUTES
  ////////////////////
  /**
   * @summary {@link HTMLElement#title}, but returns this object when done (if setting).
   * @description This method exists simply for chaining.
   * @param   {string=} value the value to set
   * @returns {(xjs.HTMLElement|string)} `this` if setting; the attribute value if getting
   */
  title(value) {
    if (arguments.length) {
      this.node.title = value
      return this
    } else return this.node.title
  }

  /**
   * @summary {@link HTMLElement#lang}, but returns this object when done (if setting).
   * @description This method exists simply for chaining.
   * @param   {string=} value the value to set
   * @returns {(xjs.HTMLElement|string)} `this` if setting; the attribute value if getting
   */
  lang(value) {
    if (arguments.length) {
      this.node.lang = value
      return this
    } else return this.node.lang
  }

  /**
   * @summary {@link HTMLElement#dir}, but returns this object when done (if setting).
   * @description This method exists simply for chaining.
   * @param   {string=} value the value to set
   * @returns {(xjs.HTMLElement|string)} `this` if setting; the attribute value if getting
   */
  dir(value) {
    if (arguments.length) {
      this.node.dir = value
      return this
    } else return this.node.dir
  }

  /**
   * @summary {@link HTMLElement.dataset}, with extended functionality.
   * @description
   * This method is similar to {@link xjs.Element#attr} in that it sets attributes,
   * except that this method only sets attributes starting with the `data-` prefix, and that
   * the attribute names passed to this method differ from the those passed to {@link xjs.Element#attr}.
   *
   * When the given key is a string, it represents the data- attribute to set or get.
   * It must not include the prefix `'data-'`, and it must be given in **camelCase** format (e.g. `'hasJs'`), as specified in
   * {@link https://w3.org/TR/html52/dom.html#dom-domstringmap-__setter__-name-value-name|HTML 5.2 | DOMStringMap setter}.
   *
   * Note that if you wish to use the HTML attribute syntax **kebab-case** format, as specified in
   * {@link https://w3.org/TR/html52/dom.html#embedding-custom-non-visible-data-with-the-data-attributes|HTML 5.2 | custom data attributes},
   * you should use the {@link xjs.Element#attr} method instead, and pass `'data-has-js'` as the attribute name.
   *
   * If the key is a string and the value is a non-null {@link xjs.Element~ValueArg} type,
   * then the data- attribute will be set (or modified) with the result of the given value.
   *
   * If the key is a string and the value is `null,`
   * then the data- attribute identified by the key is removed from this element.
   *
   * If the key is a string and the value is not provided (or `undefined`),
   * then this method returns the string value of the data- attribute identified by the key.
   * If the attribute exists but is a boolean attribute, the empty string `''` is returned.
   * If no such attribute exists, then `null` is returned.
   *
   * If an object is provided as the key, then no argument may be provided as the value.
   * The object’s keys must be in **camelCase** format, as if each key were passed separately.
   * The object must have values of the {@link xjs.Element~ValueArg} type;
   * thus for each key-value pair in the object, this method assigns corresponding
   * data- attributes. You may use this method with a single object argument to set and/or remove
   * multiple attributes (using `null` to remove).
   *
   * If no argument is provided, or if the key is `''`, `{}`, or `null`, this method does nothing and returns `this`.
   *
   * @example
   * this.data('typeof', 'division') // set the `[data-typeof]` attribute (string)
   * this.data('typeof', 42)         // set the `[data-typeof]` attribute (number)  (the value will be `"42"`)
   * this.data('typeof', true)       // set the `[data-typeof]` attribute (boolean) (the value will be `"true"`)
   * this.data('typeOf', 'division') // set the `[data-type-of]` attribute
   * this.data('ID', 'my-id')        // set the `[data--i-d]` attribute *(probably not intended)*
   * this.data('typeOf', '')         // set the `[data-type-of]` attribute to the empty string: `[data-type-of=""]`
   * this.data('id', function () { return this.id() })                    // set the `[data-id]` attribute using a function in this xjs.HTMLElement’s context
   * this.data('id', function () { return this.id }, { id: 'custom-id' }) // set the `[data-id]` attribute using a function in another given context
   * this.data('instanceOf', null)   // remove the `[data-instance-of]` attribute
   * this.data('instanceOf')         // get the value of the `[data-instance-of]` attribute (`null` if it had not been set)
   * this.data({                     // set/remove multiple `[data-*]` attributes all at once
   *   prop  : 'name',
   *   scope : '',
   *   typeOf: 'Person',
   *   id    : null,
   * })
   * this.data()     // do nothing; return `this`
   * this.data('')   // do nothing; return `this`
   * this.data({})   // do nothing; return `this`
   * this.data(null) // do nothing; return `this`
   *
   * @see https://www.w3.org/TR/html52/dom.html#dom-htmlelement-dataset
   * @param   {(string|?Object<xjs.Element~ValueArg>)=} data_attr the suffix of the `[data-*]` attribute to set or get (nonempty string), or an object with {@link xjs.Element~ValueArg} type values
   * @param   {xjs.Element~ValueArg=} value the value to assign to the attribute, or `null` to remove it, or `undefined` (or not provided) to get it
   * @param   {*=} this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns {(xjs.HTMLElement|?string)} `this` if setting an attribute, else the value of the attribute specified (or `null` if that attribute hasn’t been set)
   * @throws  {TypeError} if the given attribute is not a string or nullable object
   */
  data(data_attr = '', value, this_arg = this) {
    // REVIEW: object lookups too complicated here; using standard switches
    switch (xjs.Object.typeOf(data_attr)) {
      case 'null': break;
      case 'string':
        if (data_attr.trim() === '') break;
        switch (xjs.Object.typeOf(value)) {
          case 'function' : return this.data(data_attr, value.call(this_arg));
          case 'null'     : delete this.node.dataset[data_attr]; break;
          case 'undefined': let returned = this.node.dataset[data_attr]; return (returned || returned === '') ? returned : null;
          default         : this.node.dataset[data_attr] = value; break;
        }
        break;
      case 'object': for (let i in data_attr) this.data(i, data_attr[i]); break;
      default      : throw new TypeError('Provided name must be a string or (nullable) object.')
    }
    return this
  }

  ///////////////////
  // USER INTERACTION
  ///////////////////
  /**
   * @summary {@link HTMLElement#hidden}, but returns this object when done (if setting).
   * @description This method exists simply for chaining.
   * @param   {boolean=} value the value to set
   * @returns {(xjs.HTMLElement|boolean)} `this` if setting; the attribute value if getting
   */
  hidden(value) {
    if (arguments.length) {
      this.node.hidden = value
      return this
    } else return this.node.hidden
  }

  /**
   * @summary {@link HTMLElement#tabIndex}, but returns this object when done (if setting).
   * @description This method exists simply for chaining.
   * @param   {number=} value the value to set
   * @returns {(xjs.HTMLElement|number)} `this` if setting; the attribute value if getting
   */
  tabIndex(value) {
    if (arguments.length) {
      this.node.tabIndex = value
      return this
    } else return this.node.tabIndex
  }
}

module.exports = xjs.HTMLElement
