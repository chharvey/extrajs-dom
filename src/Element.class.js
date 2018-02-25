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
   * @summary Return this element’s styles object.
   * @description The key-value pairs of the object returned correspond to
   * the property-value pairs of this element’s css.
   * @example
   * let el = new Element('div').attr('style','color: blue;')
   * let st = el.styles // { color: 'blue' }
   * return st.color === 'blue'
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
   *
   * @example
   * this.view.html() // returns '<span data-foo="bar" data-baz="qux" fizz="buzz"></span>'
   * this.attributes  // returns { 'data-foo':'bar', 'data-baz':'qux', fizz:'buzz' }
   * this.dataset     // returns { foo:'bar', baz:'qux' }
   *
   * let el = new Element('div').attr('data-instanceof','Promise')
   * let da = el.dataset // { instanceof: 'Promise' }
   * return da.instanceof === 'Promise'
   *
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


  /**
   * @summary Shortcut method for setting/getting the `style` attribute of this element.
   * @description
   *
   * @example
   * this.style('background:none; font-weight:bold;')      // set the [style] attribute, with a string
   * this.style({background:'none', 'font-weight':'bold'}) // set the [style] attribute, with an object
   * this.style(function () { return 'background:none; font-weight:bold;' }) // set the [style] attribute, with a function: the function must return a string
   * this.style('font-family: \'Helvetica Neue\';')        // quotes must be escaped (or you could use a template literal)
   * this.style(null)                                      // remove the [style] attribute
   * this.style({})                                        // remove the [style] attribute
   * this.style('')                                        // set the [style] attribute to the empty string: `[style=""]`
   * this.style()                                          // return the value of [style], as a string (or `null` if absent)
   *
   * @param   {(Element.ValueArg|Object<string>)=} arg the value to set for the `style` attribute; not a number or boolean though
   * @returns {(xjs.Element|Object<string>|string=)} `this` if setting the style, else the value of the style (or `undefined` if not set)
   * @throws  {TypeError} if the given argument is a number or boolean
   */
  style(arg) {
    if (['number','infinite','boolean'].includes(xjs.Object.typeOf(arg))) throw new TypeError('Provided argument cannot be a number or boolean.')
    let returned = {
      object: function () {
        return this.attr('style', new ObjectString(arg).toCssString() || null)
      },
      string: function () {
        if (arg.trim() === '') return this.attr('style', '')
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
   * @example
   * this.css('background', 'red')                       // set a property (string)
   * this.css('content', false)                          // set a property (boolean)
   * this.css('opacity', 0.5)                            // set a property (number)
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
   *
   * @param   {(string|Object<Element.ValueArg>)=} prop the name of the css property to set or get, or an object with Element.ValueArg type values
   * @param   {Element.ValueArg=} value the value to set, or `null` to remove the value, or `undefined` (or not provided) to get it
   * @returns {(xjs.Element|string)} `this` if setting a property, else the value of the property specified
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
   *
   * @example
   * this.data('type','division') // <div data-type="division"></div>
   *
   * @example
   * this.attr('data-type','division').data('class','null') // <div data-type="division" data-class="null"></div>
   * this.data('type') === 'division'                       // true
   * this.data('quality')                                   // null
   *
   * @example
   * this.attr('data-type','division').data('class','null') // <div data-type="division" data-class="null"></div>
   * this.data('type', null)                                // <div data-class="null"></div>
   *
   * @param   {(string|Object<Element.ValueArg>)=} name the suffix of the `[data-*]` attribute (nonempty string), or an object with Element.ValueArg type values
   * @param   {Element.ValueArg=} value the value to assign to the attribute, or `null` to remove it, or `undefined` (or not provided) to get it
   * @returns {(xjs.Element|string)} `this` if setting an attribute, else the value of the attribute specified
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












}

module.exports = Element
