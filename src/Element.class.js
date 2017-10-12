const xjs          = require('extrajs')
const ObjectString = require('./ObjectString.class.js')

/**
 * Represents an HTML element.
 */
class Element {
  /**
   * @summary Construct a new Element object.
   * @description By default, the parameter `is_void` is true for “Void Elements” as in
   * the HTML specification (and thus the argument need not be explicilty provided).
   * Otherwise, `is_void` is false by default, unless explicitly specified.
   * @version STABLE
   * @see https://www.w3.org/TR/html/syntax.html#void-elements
   * @param {string} name the immutable name of the tag
   * @param {boolean=} is_void `true` if this element is void (has no closing tag)
   */
  constructor(name, is_void = false) {
    /** @private @final */ this._NAME = name
    /** @private @final */ this._VOID = is_void || [
      'area',
      'base',
      'br',
      'col',
      'embed',
      'hr',
      'img',
      'input',
      'keygen',
      'link',
      'menuitem',
      'meta',
      'param',
      'source',
      'track',
      'wbr',
    ].includes(name)

    /**
     * All the HTML attributes of this element.
     * @private
     * @type {ObjectString}
     */
    this._attributes = new ObjectString()

    /**
     * The contents of this element.
     * If this is a void element, it must have no contents, and its tag must be self-closing.
     * @private
     * @type {?string}
     */
    this._contents = (this._VOID) ? null : ''
  }



  /**
   * Return this element’s name.
   * @version LOCKED
   * @returns {string} the name of this Element
   */
  get name() { return this._NAME }

  /**
   * @summary Return whether this element is a void element.
   * @description Void elements have no end tag, and have the
   * **nothing content model** (they must not have any contents).
   * @version LOCKED
   * @returns {boolean} `true` if this element is void; `false` otherwise
   */
  get isVoid() { return this._VOID }

  /**
   * @summary Return this element’s attributes object.
   * @description The key-value pairs of the object returned correspond to
   * the attribute-value pairs of this element.
   * @version LOCKED
   * @returns {Object<string>} an object containing the attribute-value pairs of this element
   */
  get attributes() { return this._attributes.data }

  /**
   * @summary Return the contents of this element.
   * @version LOCKED
   * @returns {?string} this element’s contents, or `null` if this is a void element
   */
  get contents() { return this._contents }

  /**
   * @summary Return this element’s styles object.
   * @description The key-value pairs of the object returned correspond to
   * the property-value pairs of this element’s css.
   * @version LOCKED
   * @returns {Object<string>} an object containing the property-value pairs of this element’s css
   */
  get styles() {
    try {
      return ObjectString.fromCssString(this.style()).data // throws an error if there is no `[style]` attribute
    } catch (e) {
      return {}
    }
  }

  /**
   * @summary Return an object containing all the `[data-*]` attribute-value pairs of this element.
   * @description Note that the keys of this object do not contain the string `'data-'`.
   * Example:
   * ```js
   * this.html()     // returns '<span data-foo="bar" data-baz="qux" fizz="buzz"></span>'
   * this.attributes // returns { 'data-foo':'bar', 'data-baz':'qux', fizz:'buzz' }
   * this.dataset    // returns { foo:'bar', baz:'qux' }
   * ```
   * @version LOCKED
   * @returns {Object<string>} an object containing keys and values corresponing to this element’s `[data-*]` custom attributes
   */
  get dataset() {
    let returned = new ObjectString()
    for (let i in this._attributes.data) {
      if (i.slice(0,5) === 'data-') returned.set(i.slice(5), this._attributes.data[i])
    }
    return returned.data
  }



  /**
   * NOTE: TYPE DEFINITION
   * @summary A type to provide as a value argument for setting/removing an attribute.
   * @description
   * ```json
   * {
   *   "$schema"    : "http://json-schema.org/schema#",
   *   "title"      : "Element.ValueArg",
   *   "description": "A type to provide as a value argument for setting/removing an attribute.",
   *   "type"       : ["ObjectString.ValueType", "function():ObjectString.ValueType", "null"],
   *   "oneOf"      : [
   *     { "type": "ObjectString.ValueType"           , "description": "set the attribute to an ObjectString.ValueType value" },
   *     { "type": "function():ObjectString.ValueType", "description": "call the function on `this` and then set the attribute to the result" },
   *     { "type": "null"                             , "description": "remove the attribute altogether" }
   *   ]
   * }
   * ```
   * @typedef {?(ObjectString.ValueType|function():ObjectString.ValueType)} Element.ValueArg
   */
  /**
   * @summary Set or get attributes of this element.
   * @description
   * If the key given is a string, and the value is a non-null {@link Element.ValueArg} type,
   * then the attribute will be set (or modified) with the result of the value.
   *
   * If the key is a string and the value is `null,`
   * then the attribute identified by the key is removed from this element.
   *
   * If the key is a string and the value is not provided (or `undefined`),
   * then this method returns the value of the attribute identified by the key.
   * If no such attribute exists, `undefined` is returned.
   *
   * If an object is provided as the key, then no argument may be provided as the value.
   * The object must have values of the {@link Element.ValueArg} type;
   * thus for each key-value pair in the object, this method assigns corresponding
   * attributes. You may use this method with a single object argument to set and/or remove
   * multiple attributes (using `null` to remove).
   *
   * If no arguments are provided, or if the key is `''`, this method does nothing and returns `this`.
   *
   * Examples:
   * ```js
   * this.attr('itemtype', 'HTMLElement')                   // set the `[itemtype]` attribute
   * this.attr('itemscope', '')                             // set the boolean `[itemscope]` attribute
   * this.attr('itemtype')                                  // get the value of the `[itemtype]` attribute (or `undefined` if it had not been set)
   * this.attr('itemprop', null)                            // remove the `[itemprop]` attribute
   * this.attr('data-id', function () { return this.id() }) // set the `[data-id]` attribute to this element’s ID
   * this.attr({                                            // set/remove multiple attributes all at once
   *   itemprop : 'name',
   *   itemscope: '',
   *   itemtype : 'Person',
   *   'data-id': null, // remove the `[data-id]` attribute
   * })
   * this.attr()                                            // do nothing; return `this`
   * ```
   *
   * Notes:
   * - If the attribute is a **boolean attribute** and is present (such as [`checked=""`]), provide the empty string `''` as the value.
   * - Since this method returns `this`, it can be chained, e.g.,
   *   `my_elem.attr('itemscope', '').attr('itemtype','Thing').attr('itemprop', null)`.
   *   However, it may be simpler to use an object argument:
   *   `my_elem.attr({ itemscope:'', itemtype:'Thing', itemprop:null })`.
   *   Note you can also use the method {@link Element#attrStr}
   *   if you have strings and are not removing any attributes:
   *   `my_elem.attrStr('itemscope=""', 'itemtype="Thing"')`.
   *
   * @version STABLE
   * @param   {(string|!Object<Element.ValueArg>)=} attr the name of the attribute to set or get (nonempty string), or an object with Element.ValueArg type values
   * @param   {Element.ValueArg=} value the value to set, or `null` to remove the value, or `undefined` (or not provided) to get it
   * @returns {(Element|string)} `this` if setting an attribute, else the value of the attribute specified
   * @throws  {TypeError} if the given attribute is not a string or object
   * @throws  {TypeError} if the given attribute has been removed or not set
   */
  attr(attr = '', value) {
    // REVIEW: object lookups too complicated here; using standard switches
    switch (xjs.Object.typeOf(attr)) {
      case 'string':
        if (attr.trim() === '') break;
        switch (xjs.Object.typeOf(value)) {
          case 'function' : return this.attr(attr, value.call(this));
          case 'null'     : this._attributes.delete(attr); break;
          case 'undefined':
            if (xjs.Object.typeOf(this._attributes.get(attr)) === 'undefined') throw new TypeError(`Attribute '${attr}' is undefined.`);
            return this._attributes.get(attr);
          default         : this._attributes.set(attr, value); break; // string, boolean, number, infinite, NaN
        }
        break;
      case 'object': for (let i in attr) this.attr(i, attr[i]); break;
      default      : throw new TypeError('Provided attribute must be a string or object.')
    }
    return this
  }

  /**
   * @summary Add (or modify) one or more attributes, given strings.
   * @description Strings must take the form `'attribute="attr value"'`.
   * Multiple arguments may be provided.
   * This method does not remove attributes.
   *
   * Examples:
   * ```js
   * this.attr('itemprop','name').attr('itemscope','').attr('itemtype':'Person') // old
   * this.attrStr('itemprop="name"', 'itemscope=""', 'itemtype="Person"')        // new
   * this.attrStr() // do nothing; return `this`
   * ```
   * @version EXPERIMENTAL
   * @param   {...string} attr_str a string of the format `'attribute="attr value"'`
   * @returns {Element} `this`
   */
  attrStr(...attr_str) {
    attr_str.forEach((str) => this.attr(str.split('=')[0], str.split('=')[1].slice(1,-1)))
    return this
  }

  /**
   * @summary Shortcut method for setting/getting the `id` attribute of this element.
   * @description Examples:
   * ```js
   * this.id('section1') // set the [id] attribute
   * this.id(function () { return this.name }) // set the [id] attribute using a function
   * this.id(null)       // remove the [id] attribute
   * this.id('')         // remove the [id] attribute
   * this.id()           // return the value of [id]
   * ```
   * @version LOCKED
   * @param   {Element.ValueArg=} id the value to set for the `id` attribute; nonempty string
   * @returns {(Element|string)} `this` if setting the ID, else the value of the ID
   */
  id(id) {
    if (xjs.Object.typeOf(id)==='string' && id.trim()==='') return this.id(null)
    return this.attr('id', id)
  }

  /**
   * @summary Shortcut method for setting/getting the `class` attribute of this element.
   * @description Examples:
   * ```
   * this.class('o-Object c-Component') // set the [class] attribute
   * this.class(function () { return this.name }) // set the [class] attribute using a function
   * this.class(null)                   // remove the [class] attribute
   * this.class('')                     // remove the [class] attribute
   * this.class()                       // return the value of [class]
   * ```
   * @version LOCKED
   * @param   {Element.ValueArg=} class_ the value to set for the `class` attribute; nonempty string
   * @returns {(Element|string)} `this` if setting the class, else the value of the class
   */
  class(class_) {
    if (xjs.Object.typeOf(class_)==='string' && class_.trim()==='') return this.class(null)
    return this.attr('class', class_)
  }

  /**
   * @summary Append to this element’s `[class]` attribute.
   * @description When adding classes, use this method instead of {@link Element#class},
   * as the latter will overwrite the `[class]` attribute.
   * Examples:
   * ```js
   * this.addClass('o-Object c-Component') // add to the [class] attribute
   * this.addClass()                       // do nothing; return `this`
   * ```
   * @version LOCKED
   * @param   {string=} class_str the classname(s) to add, space-separated; nonempty string
   * @returns {Element} `this`
   */
  addClass(class_str = '') {
    if (class_str.trim() === '') return this
    try {
      return this.class(`${this.class()} ${class_str}`) // throws an error if there is no `[class]` attribute
    } catch (e) {
      return this.class(class_str)
    }
  }

  /**
   * @summary Remove one or more tokens from this element’s `class` attribute.
   * @description Examples:
   * ```js
   * this.removeClass('o-Object') // remove one class
   * this.removeClass('o-Object', 'c-Component') // remove multiple classes
   * this.removeClass()           // do nothing; return `this`
   * ```
   * @version LOCKED
   * @param   {...string} classname classname to remove; must not contain spaces
   * @returns {Element} `this`
   */
  removeClass(...classname) {
    try {
      return this.class((this.class())
        .split(' ')
        .filter((str) => !classname.includes(str))
        .join(' ')
      )
    } catch (e) {
      return this
    }
  }

  /**
   * @summary Shortcut method for setting/getting the `style` attribute of this element.
   * @description Examples:
   * ```js
   * this.style('background:none; font-weight:bold;')      // set the [style] attribute, with a string
   * this.style({background:'none', 'font-weight':'bold'}) // set the [style] attribute, with an object
   * this.style(function () { return 'background:none; font-weight:bold;' }) // set the [style] attribute, with a function: the function must return a string
   * this.style(null)                                      // remove the [style] attribute
   * this.style()                                          // return the value of [style], as a string
   * ```
   * @version STABLE
   * @param   {(Element.ValueArg|Object<string>)=} arg the value to set for the `style` attribute; not a number or boolean though
   * @returns {(Element|Object<string>|string=)} `this` if setting the style, else the value of the style (or `undefined` if not set)
   * @throws  {TypeError} if the given argument is a number or boolean
   */
  style(arg) {
    if (['number','infinite','boolean'].includes(xjs.Object.typeOf(arg))) throw new TypeError('Provided argument cannot be a number or boolean.')
    let returned = {
      object: function () {
        return this.attr('style', new ObjectString(arg).toCssString() || null)
      },
      string: function () {
        return this.style(ObjectString.fromCssString(arg).data)
      },
      default: function () { // function, null, undefined
        return this.attr('style', arg)
      },
    }
    return (returned[xjs.Object.typeOf(arg)] || returned.default).call(this)
  }

  /**
   * @summary Set or get css properties of this element’s inline styles (`[style]` attribute).
   *
   * @description If the key given is a string, and the value is a non-null {@link Element.ValueArg} type,
   * then the property will be set (or modified) with the result of the value.
   *
   * If the key is a string and the value is `null,` or if the value is `''` (CHANGED!),
   * then the property identified by the key is removed from this element’s css.
   *
   * If the key is a string and the value is not provided (or `undefined`),
   * then this method returns the value of the property identified by the key.
   * If no such property exists, `undefined` is returned.
   * (NOTE that css properties default to the `unset` value---either `inherit` or `initial`,
   * depending on whether the property is inherited or not.)
   *
   * If an object is provided as the key, then no argument may be provided as the value.
   * The object must have values of the {@link Element.ValueArg} type;
   * thus for each key-value pair in the object, this method assigns corresponding
   * css properties. You may use this method with a single object argument to set and/or remove
   * multiple properties (using `null` to remove).
   *
   * If no arguments are provided, or if the key is `''`, this method does nothing and returns `this`.
   *
   * Examples:
   * ```js
   * this.css('background', 'red')                       // set the `background` property
   * this.css('font-weight', '')                         // remove the `font-weight` property
   * this.css('text-align')                              // get the value of the `text-align` property (or `undefined` if it had not been set)
   * this.css('font-weight', null)                       // remove the `font-weight` property
   * this.css('color', function () { return this.id() }) // set the `color` property to this element’s ID
   * this.css({                                          // set/remove multiple attributes all at once
   *   background  : 'red',
   *   margin      : '1rem',
   *   opacity     : 0.5,
   *   visibility  : null, // remove the `visibility` property
   *   'text-align': '',   // remove the `text-align` property
   * })
   * this.css()                                          // do nothing; return `this`
   * ```
   *
   * @version STABLE
   * @param   {(string|Object<Element.ValueArg>)=} prop the name of the css property to set or get, or an object with Element.ValueArg type values
   * @param   {Element.ValueArg=} value the value to set, or `null` to remove the value, or `undefined` (or not provided) to get it
   * @returns {(Element|string)} `this` if setting a property, else the value of the property specified
   * @throws  {TypeError} if the given property is not a string or object
   * @throws  {TypeError} if the given property has been removed or not set
   */
  css(prop = '', value) {
    // REVIEW: object lookups too complicated here; using standard switches
    switch (xjs.Object.typeOf(prop)) {
      case 'string':
        if (prop.trim() === '') break;
        /**
         * A new ObjectString representing this element’s styles.
         * @type {ObjectString}
         */
        let $styles = new ObjectString(this.styles)
        switch (xjs.Object.typeOf(value)) {
          case 'function' : return this.css(prop, value.call(this));
          case 'null'     : $styles.delete(prop); break;
          case 'undefined':
            if (xjs.Object.typeOf($styles.get(prop)) === 'undefined') throw new TypeError(`Property '${prop}' is undefined.`);
            return $styles.get(prop);
          case 'string'   : if (value.trim() === '') return this.css(prop, null);
          default         : $styles.set(prop, value); break; // boolean, number, infinite, NaN
        }
        return this.style($styles.data)
      case 'object': for (let i in prop) this.css(i, prop[i]); break;
      default      : throw new TypeError('Provided property must be a string or object.')
    }
    return this
  }

  /**
   * @summary Set/get/remove a `[data-*]` custom attribute with a name and a value.
   * @description Shorthand method for <code>this.attr(`data-${name}`, value)</code>.
   * Providing no arguments does nothing and returns `this`.
   * @version LOCKED
   * @param   {(string|Object<Element.ValueArg>)=} name the suffix of the `[data-*]` attribute (nonempty string), or an object with Element.ValueArg type values
   * @param   {Element.ValueArg=} value the value to assign to the attribute, or `null` to remove it, or `undefined` (or not provided) to get it
   * @returns {(Element|string)} `this` if setting an attribute, else the value of the attribute specified
   */
  data(name = '', value) {
    // REVIEW: object lookups too complicated here; using standard switches
    switch (xjs.Object.typeOf(name)) {
      case 'string':
        if (name.trim()==='') break;
        return this.attr(`data-${name.trim()}`, value)
      case 'object': for (let i in name) this.data(i, key[i]); break;
      default      : throw new TypeError('Provided name must be a string or object.')
    }
    return this
  }

  /**
   * NOTE: TYPE DEFINITION
   * @summary Any argument passed to {@link Element#addContent}.
   * @description
   * ```json
   * {
   *   "$schema": "http://json-schema.org/schema#",
   *   "title": "Element.ContentType",
   *   "type": "object",
   *   "description": "Any argument passed to {@link Element#addContent}.",
   *   "type": ["Element", "null", "string", "array"]
   *   "items": {
   *     "type": ["Element", "null", "string"]
   *   }
   * }
   * ```
   * @typedef {(?Element|string|Array<(?Element|string)>)} Element.ContentType
   */
  /**
   * @summary Add content to this element.
   * @description Multiple arguments may be passed, and each argument may be a (nullable) Element or a string.
   * Or, a single array of such entries may be passed as an argument.
   * @version STABLE
   * @param   {...Element.ContentType} contents the contents to add
   * @returns {Element} `this`
   * @throws  {TypeError} if this element is void
   */
  addContent(...contents) {
    if (this.isVoid) throw new TypeError('Cannot add contents to a void element.')
    if (xjs.Object.typeOf(contents[0]) === 'array') return this.addContent(...contents[0])
    this._contents += contents.map((c) =>
      (c instanceof Element) ? c.html() : c
    ).join('')
    return this
  }

  /**
   * @summary Add (nullable) elements as children of this element.
   * @version STABLE
   * @param   {Array<?Element>} elems array of Element objects (or `null`) to add
   * @returns {Element} `this`
   */
  addElements(elems) {
    return this.addContent(
      elems
        .filter((el) => el !== null)
        .map((el) => el.html()).join('')
    )
  }

  /**
   * @summary Render this element as an HTML string.
   * @@version STABLE
   * @returns {string} an HTML string representing this element
   */
  html() {
    if (this.isVoid) return `<${this.name}${this._attributes.toAttrString()}/>`
    return `<${this.name}${this._attributes.toAttrString()}>${this.contents}</${this.name}>`
  }



  /**
   * @summary Simple shortcut function to concatenate elements.
   * @description This method calls `.html()` on each argument and concatenates the strings,
   * or, if a single array is given, does the same to each entry in the array.
   * `null` is allowed as an argument (or as an entry in the array).
   * If an array is given, only one array is allowed.
   * @version LOCKED
   * @param   {...?Element|Array<?Element>} elements one or more elements to output, or an array of elements
   * @returns {string} the combined HTML output of all the arguments/array entries
   */
  static concat(...elements) {
    if (xjs.Object.typeOf(elements[0]) === 'array') return Element.concat(...elements[0])
    return elements
      .filter((el) => el !== null)
      .map((el) => el.html()).join('')
  }

  /**
   * NOTE: TYPE DEFINITION
   * ```json
   * {
   *   "$schema": "http://json-schema.org/schema#",
   *   "title": "ElementJSON",
   *   "type": "object",
   *   "description": "A JSON object to be converted into an Element.",
   *   "definitions": {
   *     "ObjectString.ValueType": { "type": ["string", "number", "boolean"] }
   *   },
   *   "required": ["name"],
   *   "additionalProperties": false,
   *   "properties": {
   *     "name"   : { "type": "string", "description": "the name of the Element" },
   *     "is_void": { "type": "boolean", "description": "whether the Element is void" },
   *     "attr"   : {
   *       "type": "object",
   *       "description": "the attributes of the Element",
   *       "additionalProperties": { "$ref": "#/definitions/ObjectString.ValueType" }
   *     },
   *     "content": {
   *       "type": "array",
   *       "description": "the contents of the Element",
   *       "items": {
   *         "anyOf": [{ "type": "string" }, { "$ref": "#" }]
   *       }
   *     }
   *   }
   * }
   * ```
   * @typedef  {Object} ElementJSON
   * @property {string} name the name of the Element
   * @property {boolean=} is_void whether the Element is void
   * @property {Object<ObjectString.ValueType>=} attr the attributes of the Element
   * @property {Array<(ElementJSON|string)>=} content the contents of the Element
   */
  /**
   * @summary Return a new Element object, given JSON data.
   * @version EXPERIMENTAL
   * @param   {ElementJSON} $elem data for the Element object to construct
   * @returns {Element} a new Element object representing the given data
   */
  static fromJSON($elem) {
    return new Element($elem.name, $elem.is_void)
      .attr($elem.attr)
      .addContent(($elem.content || []).map((c) =>
        (xjs.Object.typeOf(c) === 'object') ? Element.fromJSON(c) : c
      ))
  }

  /**
   * @summary Mark up data using an HTML element.
   * @description First and foremost, if the argument is an `Element` object, then this function returns
   * that object’s `.html()` value (with any added attributes specified by the options below).
   * Otherwise,
   * If the argument is an array, then a `<ul>` element is returned, with `<li>` items.
   * If the argument is a (non-array, non-function) object—even an Element object—then a `<dl>` element is returned, with
   * `<dt>` keys and `<dd>` values.
   * Then, each `<li>`, `<dt>`, and `<dd>` contains the result of this function called on that respective datum.
   * If the argument is not an object (or is a function), then it is converted to a string and returned.
   *
   * Optionally, an `options` argument may be supplied to enhance the data.
   * The following template serves as an example:
   * ```js
   * let options = {
   *   ordered: true,
   *   attributes: {
   *     list:  { class: 'o-List', itemscope: '', itemtype: 'Event'},
   *     value: { class: 'o-List__Item o-List__Value', itemprop: ((true) ? 'startTime' : 'endTime') },
   *     key:   { class: `o-List__Key ${(true) ? 'truthy' : 'falsy' }`, itemprop: `${(true) ? 'name' : 'headline'}` },
   *   },
   *   options: {
   *     ordered: false,
   *   },
   * }
   * ```
   *
   * If an Element object is given, that element’s specific attributes take precedence,
   * overwriting those given by the options, with the exception of `[class]` and `[style]`:
   * these attributes are added to those in the options.
   * ```js
   * Element.data(new Element('a').class('c-Link--mod').style({
   *   color: 'blue',
   *   'text-decoration': 'none',
   * }).attr('rel','external'), {
   *   attributes: { list: {
   *     class: 'c-Link',
   *     style: 'background: pink; text-decoration: underline;',
   *     href : '//eg.com',
   *     rel  : 'nofollow',
   *   } }
   * })
   * // returns `<a
   * //   class="c-Link c-Link--mod"
   * //   style="background:pink;text-decoration:none;color:blue"
   * //   rel="external" href="//eg.com"></a>`
   * ```
   *
   * This is the formal schema for the `options` parameter:
   * ```json
   * {
   *   "$schema": "http://json-schema.org/schema#",
   *   "title": "@param options",
   *   "type": "object",
   *   "description": "configurations for the output",
   *   "additionalProperties": false,
   *   "properties": {
   *     "ordered": {
   *       "type": "boolean",
   *       "description": "if the argument is an array, specify `true` to output an <ol> instead of a <ul>"
   *     },
   *     "attributes": {
   *       "type": "object",
   *       "description": "describes how to render the output elements’ attributes",
   *       "additionalProperties": false,
   *       "properties": {
   *         "list" : { "type": "object", "additionalProperties": { "type": "string" }, "description": "attributes of the list (<ul>, <ol>, or <dl>)" },
   *         "value": { "type": "object", "additionalProperties": { "type": "string" }, "description": "attributes of the item or value (<li> or <dd>)" },
   *         "key"  : { "type": "object", "additionalProperties": { "type": "string" }, "description": "attributes of the key (<dt>)" }
   *       }
   *     },
   *     "options": {
   *       "allOf": [{ "$ref": "#" }],
   *       "description": "configurations for nested items/keys/values"
   *     }
   *   }
   * }
   * ```
   *
   * @version EXPERIMENTAL
   * @param   {*} thing the data to mark up
   * @param   {Object=} options configurations for the output
   * @param   {boolean=} options.ordered if the argument is an array, specify `true` to output an <ol> instead of a <ul>
   * @param   {Object<Object<string>>=} options.attributes describes how to render the output elements’ attributes
   * @param   {Object<string>=} options.attributes.list  attributes of the list (<ul>, <ol>, or <dl>)
   * @param   {Object<string>=} options.attributes.value attributes of the item or value (<li> or <dd>)
   * @param   {Object<string>=} options.attributes.key   attributes of the key (<dt>)
   * @param   {Object=} options.options configurations for nested items/keys/values
   * @returns {string} the argument rendered as an HTML element
   */
  static data(thing, options = {}) {
    /**
     * Configuration attributes for elements.
     * Avoids TypeErrors (cannot read property of undefined).
     * @type {Object<Object<string>=>}
     */
    let attr = {
      list: options.attributes && options.attributes.list,
      val : options.attributes && options.attributes.value,
      key : options.attributes && options.attributes.key,
    }
    let returned = {
      object: function () {
        if (thing instanceof Element) {
          for (let i in attr.list) {
            try {
              thing.attr(i)
            } catch (e) {
              if (i !== 'class' && i !== 'style') thing.attr(i, attr.list[i])
            }
          }
          let classes = attr.list && attr.list.class || ''
          let styles  = attr.list && attr.list.style || ''
          try { classes = `${classes} ${thing.class()}` } catch (e) { ; }
          try { styles  = `${styles}; ${thing.style()}` } catch (e) { ; }
          return thing.class(classes).style(styles).html()
        }
        let returned = new Element('dl').attr(attr.list)
        for (let i in thing) {
          returned.addElements([
            new Element('dt').attr(attr.key).addContent(i),
            new Element('dd').attr(attr.val).addContent(Element.data(thing[i], options.options)),
          ])
        }
        return returned.html()
      },
      array: function () {
        return new Element((options.ordered) ? 'ol' : 'ul').attr(attr.list)
          .addElements(thing.map((el) =>
            new Element('li').attr(attr.val).addContent(Element.data(el, options.options))
          ))
          .html()
      },
      default: function () {
        return thing.toString()
      },
    }
    return (returned[xjs.Object.typeOf(thing)] || returned.default).call(null)
  }
}

module.exports = Element
