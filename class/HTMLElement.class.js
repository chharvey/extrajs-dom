const xjs = {
  Object: require('extrajs').Object,
  Element: require('../dist/class/Element.class.js').default,
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
   * @summary Reflect the `title` content attribute.
   * @see https://www.w3.org/TR/html52/dom.html#dom-htmlelement-title
   * @param   {xjs.Element~ValueArg=} val the value to set
   * @param   {*=} this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns {(xjs.HTMLElement|?string)} `this` if setting the attribute, else the value of the attribute (or `null` if it hasn’t been set)
   */
  title(val, this_arg = this) { return this.attr('title', val, this_arg) }

  /**
   * @summary Reflect the `lang` content attribute.
   * @see https://www.w3.org/TR/html52/dom.html#dom-htmlelement-lang
   * @param   {xjs.Element~ValueArg=} val the value to set
   * @param   {*=} this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns {(xjs.HTMLElement|?string)} `this` if setting the attribute, else the value of the attribute (or `null` if it hasn’t been set)
   */
  lang(val, this_arg = this) { return this.attr('lang', val, this_arg) }

  /**
   * @summary Reflect the `dir` content attribute.
   * @see https://www.w3.org/TR/html52/dom.html#dom-htmlelement-dir
   * @param   {xjs.Element~ValueArg=} val the value to set
   * @param   {*=} this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns {(xjs.HTMLElement|?string)} `this` if setting the attribute, else the value of the attribute (or `null` if it hasn’t been set)
   */
  dir(val, this_arg = this) { return this.attr('dir', val, this_arg) }

  /**
   * @summary {@link HTMLElement.style}, with extended functionality.
   * @description
   * This method manipulates an element’s associated {@link CSSStyleDeclaration} object.
   *
   * When the given key is a string, it represents the CSS property name to set or get.
   * It must be given in **kebab-case** format (e.g. `'text-align'`), as specified in
   * {@link https://w3.org/TR/CSS2/syndata.html#declaration|CSS 2.1 | Declarations and properties}.
   *
   * If the key is a string and the value is a non-null {@link xjs.Element~ValueArg} type,
   * *except for the empty string `''`,*
   * then the CSS property will be set (or modified) with the result of the given value.
   *
   * If the key is a string and the value is `null` or the empty string `''`,
   * then the CSS property identified by the key is removed from this element.
   *
   * If the key is a string and the value is not provided (or `undefined`),
   * then this method returns the string value of the CSS property identified by the key.
   * If no such property exists, then `null` is returned.
   * (Note that css properties default to the `unset` value---either `inherit` or `initial`,
   * depending on whether the property is inherited or not.)
   *
   * If an object is provided as the key, then no argument may be provided as the value.
   * The object must have values of the {@link xjs.Element~ValueArg} type;
   * thus for each key-value pair in the object, this method assigns corresponding
   * CSS properties. You may use this method with a single object argument to set and/or remove
   * multiple properties (using `null` to remove).
   *
   * If no argument is provided, or if the key is `''`, `{}`, or `null`, this method does nothing and returns `this`.
   *
   * @example
   * this.style('background', 'red')      // set the `background` property (string) (the value will be `red`)
   * this.style('opacity', 0.5)           // set the `opacity` property (number)
   * this.style('content', false)         // set the `content` property (boolean)
   * this.style('content', '\'truthy\'')  // set the `content` property (quoted string, must be escaped) (the value will be `'truthy'`)
   * this.style('content', '"truthy"')    // or you could use double-quotes
   * this.style('content', `'truthy'`)    // or you could use a template literal
   * this.style('font-weight', 'bold')    // set the `font-weight` property
   * this.style('justify-content', function () { return this.data('jc') })                 // set the `justify-content` property using a function in this xjs.HTMLElement’s context
   * this.style('justify-content', function () { return this.jc }, { jc: 'space-around' }) // set the `justify-content` property using a function in another given context
   * this.style('font-style', null)       // remove the `font-style` property
   * this.style('font-style', '')         // remove the `font-style` property // *note that this syntax differs from the typical syntax shown by xjs.Element#attr
   * this.style('text-align')             // get the value of the `text-align` property (or `null` if it had not been set)
   * this.style({                         // set/remove multiple properties all at once
   *   background  : 'red',
   *   margin      : '1rem',
   *   opacity     : 0.5,
   *   content     : `''`, // sets the css `content: '';`
   *   visibility  : null, // remove the `visibility` property
   *   'text-align': '',   // remove the `text-align` property
   * })
   * this.style()     // do nothing; return `this`
   * this.style('')   // do nothing; return `this`
   * this.style({})   // do nothing; return `this`
   * this.style(null) // do nothing; return `this`
   *
   * @see https://www.w3.org/TR/cssom-1/#dom-elementcssinlinestyle-style
   * @param   {(string|?Object<xjs.Element~ValueArg>)=} prop the name of the css property to set or get (nonempty string), or an object with {@link xjs.Element~ValueArg} type values
   * @param   {xjs.Element~ValueArg=} value the value to assign to the property, or `null` or `''` to remove it, or `undefined` (or not provided) to get it
   * @param   {*=} this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns {(xjs.HTMLElement|string)} `this` if setting a property, else the value of the property specified (or `null` if that property hasn’t been set)
   * @throws  {TypeError} if the given property is not a string or nullable object
   */
  style(prop = '', value, this_arg = this) {
    // REVIEW: object lookups too complicated here; using standard switches
    switch (xjs.Object.typeOf(prop)) {
      case 'null': break;
      case 'string':
        if (prop.trim() === '') break;
        switch (xjs.Object.typeOf(value)) {
          case 'function' : return this.style(prop, value.call(this_arg));
          case 'undefined': return this.node.style.getPropertyValue(prop) || null;
          default         :
            switch (value) {
              case ''  :
              case null: this.node.style.removeProperty(prop); break;
              default  : this.node.style.setProperty(prop, value); break; // string, boolean, number, infinite, NaN
            }
        }
        break;
      case 'object': for (let i in prop) this.style(i, prop[i]); break;
      default      : throw new TypeError('Provided property must be a string or (nullable) object.')
    }
    return this
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
   * this.data('typeof', 'my type')  // set the `[data-typeof]` attribute (string)
   * this.data('typeof', 42)         // set the `[data-typeof]` attribute (number)  (the value will be `"42"`)
   * this.data('typeof', true)       // set the `[data-typeof]` attribute (boolean) (the value will be `"true"`)
   * this.data('typeOf', 'my type')  // set the `[data-type-of]` attribute
   * this.data('type-of', 'my type') // ERROR! "Uncaught DOMException: Failed to set the 'type-of' property on 'DOMStringMap': 'type-of' is not a valid property name."
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
   * @summary Reflect the `hidden` content attribute.
   * @see https://www.w3.org/TR/html52/editing.html#dom-htmlelement-hidden
   * @param   {xjs.Element~ValueArg=} val the value to set
   * @param   {*=} this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns {(xjs.HTMLElement|?string)} `this` if setting the attribute, else the value of the attribute (or `null` if it hasn’t been set)
   */
  hidden(val, this_arg = this) { return this.attr('hidden', val, this_arg) }

  /**
   * @summary Reflect the `tabindex` content attribute.
   * @see https://www.w3.org/TR/html52/editing.html#dom-htmlelement-tabindex
   * @param   {xjs.Element~ValueArg=} val the value to set
   * @param   {*=} this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns {(xjs.HTMLElement|?string)} `this` if setting the attribute, else the value of the attribute (or `null` if it hasn’t been set)
   */
  tabIndex(val, this_arg = this) { return this.attr('tabindex', val, this_arg) }
}

module.exports = xjs.HTMLElement
