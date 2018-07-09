import {dev_Element} from '../dev.d'
import xjs_Node from './Node.class'

const xjs = {
  Object: require('extrajs').Object,
}

/**
 * @summary A type to provide as a value argument for setting/removing an attribute.
 * @description
 * - If it is a string, number, or boolean, then the attribute value will be set to
 *   that value, stringified (number and boolean converted to a string).
 * - If it is `null`, the attribute is removed.
 * - If it is a function,
 *   it must take zero arguments and return a single primitive value;
 *   any `this` context in the function will almost always point to this `xjs.Element` object
 *   (unless another `thisArg` is passed elsewhere);
 *   and the return value---which must be a string, number, or boolean---is set as the attribute value.
 */
export type ValueArg = ((this: any) => string|number|boolean) | string | number | boolean | null

/**
 * Wrapper for an Element.
 * @see https://www.w3.org/TR/dom/#element
 */
export default class xjs_Element extends xjs_Node {
  /**
   * @summary Construct a new xjs_Element object.
   * @param node the node to wrap
   */
  constructor(node: Element) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   */
  get node(): dev_Element { return <dev_Element>super.node }


  /**
   * @summary This element’s tag name in lowercase.
   * @see https://www.w3.org/TR/dom/#dom-element-tagname
   */
  get tagName(): string { return this.node.tagName.toLowerCase() }

  /**
   * @summary {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML|Element#innerHTML}, but returns this object when done (if setting).
   * @description This method exists simply for chaining.
   * @see https://www.w3.org/TR/DOM-Parsing/#widl-Element-innerHTML
   * @param   markup the html to set
   * @returns `this` if setting; the innerHTML if getting
   */
  innerHTML(markup?: string): (this|string) {
    if (arguments.length) {
      this.node.innerHTML = <string>markup
      return this
    } else return <string>this.node.innerHTML
  }

  /**
   * @summary {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML|Element#outerHTML}, but returns this object when done (if setting).
   * @description This method exists simply for chaining.
   * @todo TODO: setter is not defined yet; only use this method as a getter.
   * @see https://www.w3.org/TR/DOM-Parsing/#widl-Element-outerHTML
   * @param   markup the html to set
   * @returns `this` if setting; the outerHTML if getting
   */
  outerHTML(markup?: string): (this|string) {
    if (arguments.length) {
      throw new Error('feature not supported yet')
      return this
    } else return <string>this.node.outerHTML
  }

  /**
   * @summary {@link https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/prepend|ParentNode#prepend}, but returns this object when done.
   * @description This method exists simply for chaining.
   * @example
   * let strong = document.createElement('strong')
   * strong.textContent = 'hello'
   * let em = document.createElement('em')
   * let mark = document.createElement('mark')
   *
   * let snippet = new xjs.Element(document.createElement('div'))
   *   .prepend(...[
   *     strong,                                       // DOM Node
   *     ` to the `,                                   // string
   *     new Comment(`great`),                         // DOM Node
   *     `<small>big</small> `,                        // string with HTML
   *     new xjs.Element(em).addContent(`world`).node, // DOM Node (unwrapped)
   *     null,                                         // null
   *     new xjs.Element(mark).addContent(`!`),        // wrapped DOM Node
   *   ]).innerHTML()
   * return snippet === `<strong>hello</strong> to the <!--great--><small>big</small> <em>world</em><mark>!</mark>`
   * @todo TODO xjs.ParentNode#prepend
   * @see https://dom.spec.whatwg.org/#dom-parentnode-prepend
   * @param   contents the contents to prepend
   * @returns `this`
   */
  prepend(...contents: (xjs_Node|Node|string|null)[]): this {
    this.node.prepend(...contents.map((c) =>
      (c instanceof xjs_Node) ? c.node :
      (c === null) ? '' : c
    ))
    return this
  }

  /**
   * @summary {@link https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/append|ParentNode#append}, but returns this object when done.
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
   * @todo TODO xjs.ParentNode#append
   * @see https://dom.spec.whatwg.org/#dom-parentnode-append
   * @param   contents the contents to append
   * @returns `this`
   */
  append(...contents: (xjs_Node|Node|string|null)[]): this {
    this.node.append(...contents.map((c) =>
      (c instanceof xjs_Node) ? c.node :
      (c === null) ? '' : c
    ))
    return this
  }


  /**
   * @description DEPRECATED.
   * If no argument is provided, this method does nothing and returns `this`.
   * @example
   * this.attr()     // do nothing; return `this`
   * @returns `this`
   */
  attr(): this;
  /**
   * @summary Get an attribute of this element.
   * @description
   * If the key is a string and the value is not provided (or `undefined`),
   * then this method returns the string value of the attribute identified by the key.
   * If the attribute exists but is a boolean attribute, the empty string `''` is returned.
   * If no such attribute exists, then `null` is returned.
   *
   * If the key is `''`, this method does nothing and returns `this`.
   *
   * @example
   * this.attr('itemtype')           // get the value of the attribute (or `null` if it had not been set)
   * this.attr('')   // do nothing; return `this`
   *
   * @todo TODO handle case of empty string
   * @param   attr the name of the attribute to get (nonempty string)
   * @returns the value of the attribute specified (or `null` if that attribute hasn’t been set)
   */
  attr(attr: string): string|null;
  /**
   * @summary Set or remove an attribute of this element.
   * @description
   * If the key given is a string, and the value is a non-null {@link ValueArg} type,
   * then the attribute will be set (or modified) with the result of the value.
   *
   * If the key is a string and the value is `null,`
   * then the attribute identified by the key is removed from this element.
   *
   * Notes:
   * - If the attribute is a **boolean attribute** and is present (such as [`checked=""`]), provide the empty string `''` as the value.
   * - Since this method returns `this`, it can be chained, e.g.,
   *   ```js
   *   my_elem.attr('itemscope', '').attr('itemtype','Thing').attr('itemprop', null)
   *   ```
   *   However, it may be simpler to use an object argument:
   *   ```js
   *   my_elem.attr({ itemscope:'', itemtype:'Thing', itemprop:null })
   *   ```
   *
   * @example
   * this.attr('itemtype', 'Person') // set an attribute (string)
   * this.attr('data-nthchild', 3)   // set an attribute (number)  (the value will be `"3"`)
   * this.attr('data-block', true)   // set an attribute (boolean) (the value will be `"true"`)
   * this.attr('itemscope', '')      // set a boolean attribute
   * this.attr('data-id', function () { return this.id() })                    // set an attribute using a function in this xjs.Element’s context
   * this.attr('data-id', function () { return this.id }, { id: 'custom-id' }) // set an attribute using a function in another given context
   * this.attr('itemprop', null)     // remove an attribute
   *
   * @todo TODO handle case of empty string
   * @param   attr the name of the attribute to set (nonempty string)
   * @param   value the value to assign to the attribute, or `null` to remove it
   * @param   this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns `this`
   */
  attr(attr: string, value: ValueArg, this_arg?: any): this;
  /**
   * @summary Set or remove attributes of this element.
   * @description
   * If an object is provided as the key, then no argument may be provided as the value.
   * The object must have values of the {@link ValueArg} type;
   * thus for each key-value pair in the object, this method assigns corresponding
   * attributes. You may use this method with a single object argument to set and/or remove
   * multiple attributes (using `null` to remove).
   *
   * If the key is `{}` or `null`, this method does nothing and returns `this`.
   *
   * @example
   * this.attr({                     // set/remove multiple attributes all at once
   *   itemprop : 'name',
   *   itemscope: '',
   *   itemtype : 'Person',
   *   'data-id': null,
   * })
   * this.attr({})   // do nothing; return `this`
   * this.attr(null) // do nothing; return `this`
   *
   * @param   attr an object with {@link ValueArg} type values
   * @returns `this`
   */
  attr(attr: { [index: string]: ValueArg }|null): this;
  /*
   * @summary Set or get attributes of this element.
   * @description
   * If the key given is a string, and the value is a non-null {@link ValueArg} type,
   * then the attribute will be set (or modified) with the result of the value.
   *
   * If the key is a string and the value is `null,`
   * then the attribute identified by the key is removed from this element.
   *
   * If the key is a string and the value is not provided (or `undefined`),
   * then this method returns the string value of the attribute identified by the key.
   * If the attribute exists but is a boolean attribute, the empty string `''` is returned.
   * If no such attribute exists, then `null` is returned.
   *
   * If an object is provided as the key, then no argument may be provided as the value.
   * The object must have values of the {@link ValueArg} type;
   * thus for each key-value pair in the object, this method assigns corresponding
   * attributes. You may use this method with a single object argument to set and/or remove
   * multiple attributes (using `null` to remove).
   *
   * If no argument is provided, or if the key is `''`, `{}`, or `null`, this method does nothing and returns `this`.
   *
   * Notes:
   * - If the attribute is a **boolean attribute** and is present (such as [`checked=""`]), provide the empty string `''` as the value.
   * - Since this method returns `this`, it can be chained, e.g.,
   *   ```js
   *   my_elem.attr('itemscope', '').attr('itemtype','Thing').attr('itemprop', null)
   *   ```
   *   However, it may be simpler to use an object argument:
   *   ```js
   *   my_elem.attr({ itemscope:'', itemtype:'Thing', itemprop:null })
   *   ```
   *
   * @example
   * this.attr('itemtype', 'Person') // set an attribute (string)
   * this.attr('data-nthchild', 3)   // set an attribute (number)  (the value will be `"3"`)
   * this.attr('data-block', true)   // set an attribute (boolean) (the value will be `"true"`)
   * this.attr('itemscope', '')      // set a boolean attribute
   * this.attr('data-id', function () { return this.id() })                    // set an attribute using a function in this xjs.Element’s context
   * this.attr('data-id', function () { return this.id }, { id: 'custom-id' }) // set an attribute using a function in another given context
   * this.attr('itemprop', null)     // remove an attribute
   * this.attr('itemtype')           // get the value of the attribute (or `null` if it had not been set)
   * this.attr({                     // set/remove multiple attributes all at once
   *   itemprop : 'name',
   *   itemscope: '',
   *   itemtype : 'Person',
   *   'data-id': null,
   * })
   * this.attr()     // do nothing; return `this`
   * this.attr('')   // do nothing; return `this`
   * this.attr({})   // do nothing; return `this`
   * this.attr(null) // do nothing; return `this`
   *
   * @param   attr the name of the attribute to set or get (nonempty string), or an object with {@link ValueArg} type values
   * @param   value the value to assign to the attribute, or `null` to remove it, or `undefined` (or not provided) to get it
   * @param   this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns `this` if setting an attribute, else the value of the attribute specified (or `null` if that attribute hasn’t been set)
   */
  attr(attr: any = '', value?: any, this_arg: any = this): any {
    // REVIEW: object lookups too complicated here; using standard switches
    switch (xjs.Object.typeOf(attr)) {
      case 'null': break;
      case 'string':
        if ((<string>attr).trim() === '') break;
        switch (xjs.Object.typeOf(value)) {
          case 'function' : return this.attr(attr, (<Function>value).call(this_arg));
          case 'null'     : this.node.removeAttribute(<string>attr); break;
          case 'undefined': return this.node.getAttribute(<string>attr);
          default         : this.node.setAttribute(<string>attr, (<(string|number|boolean)>value).toString()); break; // string, number, boolean, infinite, NaN
        }
        break;
      case 'object': for (let i in <object>attr) this.attr(i, (<{ [index: string]: ValueArg }>attr)[i]); break;
      default: break;
    }
    return this
  }

  /**
   * @summary Get {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/id|Element#id}.
   * @returns the value of the `id` attribute, or `null` if it had not been set
   */
  id(): string|null;
  /**
   * @summary Set {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/id|Element#id}, and return this object when done.
   * @description This method exists simply for chaining.
   * This method also takes arguments usable in {@link xjs_Element#attr}.
   * @example
   * this.id('section1') // set the [id] attribute (string)
   * this.id(42)         // set the [id] attribute (number)  (the value will be `"42"`)
   * this.id(false)      // set the [id] attribute (boolean) (the value will be `"false"`)
   * this.id('')         // set the [id] attribute to the empty string: `[id=""]`
   * this.id(function () { return this.tagName })                             // set the [id] attribute using a function in this xjs.Element’s context
   * this.id(function () { return this.tagName }, { tagName: 'custom-name' }) // set the [id] attribute using a function in another given context
   * this.id(null)       // remove the [id] attribute
   * @param   value the value to set for the `id` attribute, or `null` to remove it
   * @param   this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns `this`
   */
  id(value: ValueArg, this_arg?: any): this;
  id(value?: any, this_arg: any = this): any {
    if (arguments.length) {
      if (xjs.Object.typeOf(value) === 'string') this.node.id = <string>value
      else this.attr('id', value, this_arg)
      return this
    } else return this.node.id
  }

  /**
   * @summary Get {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/className|Element#className}.
   * @returns the value of the `class` attribute, or `null` if it had not been set
   */
  class(): string|null;
  /**
   * @summary Set {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/className|Element#className}, and return this object when done.
   * @description This method exists simply for chaining.
   * This method also takes arguments usable in {@link xjs_Element#attr}.
   * @example
   * this.class('o-Object c-Component') // set the [class] attribute (string)
   * this.class(42)                     // set the [class] attribute (number)  (the value will be `"42"`)
   * this.class(false)                  // set the [class] attribute (boolean) (the value will be `"false"`)
   * this.class('')                     // set the [class] attribute to the empty string: `[class=""]`
   * this.class(function () { return this.tagName })                             // set the [class] attribute using a function in this xjs.Element’s context
   * this.class(function () { return this.tagName }, { tagName: 'custom-name' }) // set the [class] attribute using a function in another given context
   * this.class(null)                   // remove the [class] attribute
   * @param   value the value to set for the `class` attribute, or `null` to remove it
   * @param   this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns `this`
   */
  class(value: ValueArg, this_arg?: any): this;
  class(value?: any, this_arg: any = this): any {
    if (arguments.length) {
      if (xjs.Object.typeOf(value) === 'string') this.node.className = value
      else this.attr('class', value, this_arg)
      return this
    } else return this.node.className
  }

  /**
   * @summary Append one or more tokens to this element’s `[class]` attribute.
   * @description Argument(s) can also be space-separated tokens.
   * @example
   * this.addClass('o-Object', 'c-Component')          // add token(s) to the [class] attribute
   * this.addClass('o-Object c-Component', 'h-Helper') // spaces are allowed; they will just be split
   * this.addClass('')                                 // do nothing; return `this`
   * this.addClass()                                   // do nothing; return `this`
   * @param   tokens the classname(s) to add
   * @returns `this`
   */
  addClass(...tokens: string[]): this {
    tokens.forEach((token) => {
      token.split(' ').forEach((t) => {
        if (t.trim() !== '') this.node.classList.add(t)
      })
    })
    return this
  }

  /**
   * @summary Remove one or more tokens from this element’s `[class]` attribute.
   * @description Argument(s) can also be space-separated tokens.
   * @example
   * this.removeClass('o-Object', 'c-Component')          // remove token(s) from the [class] attribute
   * this.removeClass('o-Object c-Component', 'h-Helper') // spaces are allowed; they will just be split
   * this.removeClass('')                                 // do nothing; return `this`
   * this.removeClass()                                   // do nothing; return `this`
   * @param   tokens classname(s) to remove
   * @returns `this`
   */
  removeClass(...tokens: string[]): this {
    tokens.forEach((token) => {
      token.split(' ').forEach((t) => {
        if (t.trim() !== '') this.node.classList.remove(t)
      })
    })
    return this
  }

  /**
   * @summary Replace a segment of this element’s class string with a new string segment.
   * @example
   * let element = jsdom.JSDOM.fragment(`<i class="glyphicons glphicons-{{ icon }}"></i>`).querySelector('i')
   * new xjs.Element(element).replaceClass('{{ icon }}', 'mobile')
   * element.outerHTML // <a class="glyphicons glphicons-mobile"></a>
   * @param   old_ the segment of this element’s `[class]` attribute value to remove
   * @param   new_ the string with which to replace the removed segment
   * @returns `this`
   */
  replaceClassString(old_: string, new_: string): this {
    this.node.className = this.node.className.replace(old_, new_)
    return this
  }
}
