const xjs = {
  Object: require('extrajs').Object,
  Node  : require('./Node.class.js'),
}

/**
 * Wrapper for an Element.
 * @see https://www.w3.org/TR/dom/#element
 * @extends xjs.Node
 */
xjs.Element = class extends xjs.Node {
  /**
   * @summary Construct a new xjs.Element object.
   * @version STABLE
   * @param {Element} node the node to wrap
   */
  constructor(node) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   * @type {Element}
   */
  get node() { return super.node }


  /**
   * @summary This element’s tag name in lowercase.
   * @version LOCKED
   * @type {string}
   */
  get tagName() { return this.node.tagName.toLowerCase() }

  /**
   * @summary {@link Element#innerHTML}, but returns this object when done (if setting).
   * @description This method exists simply for chaining.
   * @version LOCKED
   * @param   {string=} markup the html to set
   * @returns {(xjs.Element|string)} `this` if setting; the innerHTML if getting
   */
  innerHTML(markup) {
    if (arguments.length) {
      this.node.innerHTML = markup
      return this
    } else return this.node.innerHTML
  }

  /**
   * @summary {@link Element#outerHTML}, but returns this object when done (if setting).
   * @description This method exists simply for chaining.
   * @todo TODO: setter is not defined yet; only use this method as a getter.
   * @version EXPERIMENTAL
   * @param   {string=} markup the html to set
   * @returns {(xjs.Element|string)} `this` if setting; the outerHTML if getting
   */
  outerHTML(markup) {
    if (arguments.length) {
      return this
    } else return this.node.outerHTML
  }

  /**
   * @function xjs.ParentNode#append
   * @summary {@link ParentNode#append}, but returns this object when done.
   * @description This method exists simply for chaining.
   * @example
   * let strong = document.createElement('strong')
   * strong.textContent = 'hello'
   * let em = document.createElement('em')
   * let mark = document.createElement('mark')
   *
   * let snippet = new xjs.Element(document.createElement('div'))
   *   .append(...[
   *     strong,                                       // DOM Node
   *     ` to the `,                                   // string
   *     new Comment(`great`),                         // DOM Node
   *     `<small>big</small> `,                        // string with HTML
   *     new xjs.Element(em).addContent(`world`).node, // DOM Node (unwrapped)
   *     null,                                         // null
   *     new xjs.Element(mark).addContent(`!`),        // wrapped DOM Node
   *   ]).innerHTML()
   * return snippet === `<strong>hello</strong> to the <!--great--><small>big</small> <em>world</em><mark>!</mark>`
   * @param   {...?(Node|xjs.Node|string)} contents the contents to append
   * @returns {xjs.Element} `this`
   */
  append(...contents) {
    // TODO return xjs.ParentNode.append.call(this, ...contents)
    this.node.append(...contents.map((c) =>
      (c instanceof xjs.Node) ? c.node :
      (c === null) ? '' : c
    ))
    return this
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
   *   "type"       : ["{@link ObjectString.ValueType}", "function():{@link ObjectString.ValueType}", "null"],
   *   "oneOf"      : [
   *     { "type": "{@link ObjectString.ValueType}"           , "description": "set the attribute to an ObjectString.ValueType value" },
   *     { "type": "function():{@link ObjectString.ValueType}", "description": "call the function on `this` and then set the attribute to the result" },
   *     { "type": "null"                                     , "description": "remove the attribute altogether" }
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
   * then this method returns the string value of the attribute identified by the key.
   * If no such attribute exists, then `null` is returned. (An Error is no longer thrown.)
   *
   * If an object is provided as the key, then no argument may be provided as the value.
   * The object must have values of the {@link Element.ValueArg} type;
   * thus for each key-value pair in the object, this method assigns corresponding
   * attributes. You may use this method with a single object argument to set and/or remove
   * multiple attributes (using `null` to remove).
   *
   * If no arguments are provided, or if the key is `''` or `null`, this method does nothing and returns `this`.
   *
   * @example
   * this.attr('itemtype', 'Person') // set an attribute (string)
   * this.attr('data-block', true)   // set an attribute (boolean)
   * this.attr('data-nthchild', 3)   // set an attribute (number)
   * this.attr('itemscope', '')      // set a boolean attribute
   * this.attr('itemtype')           // get the value of the attribute (or `null` if it had not been set)
   * this.attr('itemprop', null)     // remove an attribute
   * this.attr('data-id', function () { return this.id() })                    // set an attribute using this element’s context
   * this.attr('data-id', function () { return this.id }, { id: 'custom-id' }) // set an attribute using another given context
   * this.attr({            // set/remove multiple attributes all at once
   *   itemprop : 'name',
   *   itemscope: '',
   *   itemtype : 'Person',
   *   'data-id': null,
   * })
   * this.attr()              // do nothing; return `this`
   * this.attr('')            // do nothing; return `this`
   * this.attr(null)          // do nothing; return `this`
   *
   * @description
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
   * @param   {(string|?Object<Element.ValueArg>)=} attr the name of the attribute to set or get (nonempty string), or an object with Element.ValueArg type values
   * @param   {Element.ValueArg=} value the value to set, or `null` to remove the value, or `undefined` (or not provided) to get it
   * @param   {*=} this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns {(xjs.Element|?string)} `this` if setting an attribute, else the value of the attribute specified (or `null` if that attribute doesn’t exist)
   * @throws  {TypeError} if the given attribute is not a string or object
   */
  attr(attr = '', value, this_arg = this) {
    // REVIEW: object lookups too complicated here; using standard switches
    switch (xjs.Object.typeOf(attr)) {
      case 'null': break;
      case 'string':
        if (attr.trim() === '') break;
        switch (xjs.Object.typeOf(value)) {
          case 'function' : return this.attr(attr, value.call(this_arg));
          case 'null'     : this.node.removeAttribute(attr); break;
          case 'undefined': return this.node.getAttribute(attr);
          default         : this.node.setAttribute(attr, value); break; // string, boolean, number, infinite, NaN
        }
        break;
      case 'object': for (let i in attr) this.attr(i, attr[i]); break;
      default      : throw new TypeError('Provided attribute must be a string or object.')
    }
    return this
  }

  /**
   * @summary {@link Element#id}, but returns this object when done (if setting).
   * @description This method exists simply for chaining.
   * This method also takes arguments usable in {@link xjs.Element#attr}.
   * @example
   * this.id('section1') // set the [id] attribute
   * this.id('')         // set the [id] attribute to the empty string: `[id=""]`
   * this.id(function () { return this.name }) // set the [id] attribute using a function
   * this.id(null)       // remove the [id] attribute
   * this.id()           // return the value of [id]
   * @version LOCKED
   * @param   {Element.ValueArg=} value the value to set for the `id` attribute
   * @param   {*=} this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns {(xjs.Element|string)} `this` if setting; the ID if getting
   */
  id(value, this_arg = this) {
    if (arguments.length) {
      if (xjs.Object.typeOf(value) === 'string') this.node.id = value
      else this.attr('id', value, this_arg)
      return this
    } else return this.node.id
  }

  /**
   * @summary {@link Element#className}, but returns this object when done (if setting).
   * @description This method exists simply for chaining.
   * This method also takes arguments usable in {@link xjs.Element#attr}.
   * @example
   * this.class('o-Object c-Component') // set the [class] attribute
   * this.class('')                     // set the [class] attribute to the empty string: `[class=""]`
   * this.class(function () { return this.name }) // set the [class] attribute using a function
   * this.class(null)                   // remove the [class] attribute
   * this.class()                       // return the value of [class]
   * @version LOCKED
   * @param   {Element.ValueArg=} value the value to set for the `class` attribute
   * @param   {*=} this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns {(xjs.Element|string)} `this` if setting; the class if getting
   */
  class(value, this_arg = this) {
    if (arguments.length) {
      if (xjs.Object.typeOf(value) === 'string') this.node.className = value
      else this.attr('class', value, this_arg)
      return this
    } else return this.node.className
  }

  /**
   * @summary Append tokens to this element’s `[class]` attribute.
   * @description Argument(s) can also be space-separate tokens.
   * @example
   * this.addClass('o-Object', 'c-Component')          // add tokens to the [class] attribute
   * this.addClass('o-Object c-Component', 'h-Helper') // spaces are allowed; they will just be split
   * this.addClass()                       // do nothing; return `this`
   * @version LOCKED
   * @param   {...string=} tokens the classname(s) to add
   * @returns {xjs.Element} `this`
   */
  addClass(...tokens) {
    tokens.forEach(function (token) {
      token.split(' ').forEach(function (t) {
        if (t.trim() !== '') this.node.classList.add(t)
      })
    })
    return this
  }

  /**
   * @summary Remove one or more tokens from this element’s `[class]` attribute.
   * @description Argument(s) can also be space-separate tokens.
   * @example
   * this.removeClass('o-Object', 'c-Component')          // remove tokens from the [class] attribute
   * this.removeClass('o-Object c-Component', 'h-Helper') // spaces are allowed; they will just be split
   * this.removeClass()           // do nothing; return `this`
   * @version LOCKED
   * @param   {...string} tokens classname(s) to remove; tokens must be non-empty and must not have whitespace
   * @returns {xjs.Element} `this`
   */
  removeClass(...tokens) {
    tokens.forEach(function (token) {
      token.split(' ').forEach(function (t) {
        if (t.trim() !== '') this.node.classList.remove(t)
      })
    })
  }
}

module.exports = xjs.Element
