import * as xjs from 'extrajs'

import {Content} from '../ambient'
import xjs_Node from './Node.class'
import xjs_ParentNode from '../iface/ParentNode.iface'


/**
 * A type to provide as a value argument for setting/removing an attribute.
 *
 * - If it is a string, number, or boolean, then the attribute value will be set to
 *   that value, stringified (number and boolean converted to a string).
 * - If it is `null`, the attribute is removed.
 */
export type ValueType = string|number|boolean|null
/**
 * An object passed to {@link xjs_Element.attr} to manipulate many attributes at once.
 *
 * An object with string indices and {@link ValueType} values.
 */
export type ValueObject = { [index: string]: ValueType }
/**
 * A type of function passed to {@link xjs_Element.attr} to manipulate this element’s attributes.
 *
 * This function type must take zero arguments and return a single primitive value: a string, number, or boolean.
 * Any `this` context in the function will almost always point to this `xjs.Element` object (but can be overridden).
 * @returns the value used as the attribute value to set, or `null` to remove
 */
export type ValueFunction = (this: any) => ValueType

/**
 * Wrapper for an Element.
 * @see https://www.w3.org/TR/dom/#element
 */
export default class xjs_Element extends xjs_Node implements xjs_ParentNode {
  /**
   * Construct a new xjs_Element object.
   * @param node the node to wrap
   */
  constructor(node: Element) {
    super(node)
  }
  /**
   * This wrapper’s node.
   */
  get node(): Element { return super.node as Element }


  /**
   * This element’s tag name in lowercase.
   * @see https://www.w3.org/TR/dom/#dom-element-tagname
   */
  get tagName(): string { return this.node.tagName.toLowerCase() }

  /**
   * Get {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML|Element#innerHTML}.
   * @see https://www.w3.org/TR/DOM-Parsing/#widl-Element-innerHTML
   * @returns the `innerHTML` of this element
   */
  innerHTML(): string;
  /**
	 * @deprecated WARNING DEPRECATED - setting the `innerHTML` of an element is a security risk.
	 * If setting plain text, use `textContent` instead; if adding HTML, use other DOM manipulation methods such as `append`.
	 *
   * Set {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML|Element#innerHTML}, and returns this object when done.
   *
   * This method exists simply for chaining.
   * @param   markup the html to set
   * @returns `this`
   */
  innerHTML(markup: string): this;
  innerHTML(markup?: any): any {
		console.warn(`WARNING: Setting \`innerHTML\` is a security risk. Use \`.textContent\` or \`.append\` instead.`)
		if (!arguments.length) return this.node.innerHTML
		this.node.innerHTML = markup
		return this
  }

  /**
   * Get {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML|Element#outerHTML}.
   * @see https://www.w3.org/TR/DOM-Parsing/#widl-Element-outerHTML
   * @returns the `outerHTML` of this element
   */
  outerHTML(): string;
  /**
   * Set {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML|Element#outerHTML}, and returns this object when done.
   *
   * This method exists simply for chaining.
   * @todo TODO: setter is not defined yet; only use this method as a getter.
   * @param   markup the html to set
   * @returns `this`
   */
  outerHTML(markup: string): this;
  outerHTML(markup?: any): any {
		if (!arguments.length) return this.node.outerHTML
		throw new Error('feature not supported yet')
  }

	/** @implements xjs_ParentNode */
  prepend(...contents: Content[]): this {
    this.node.prepend(...contents.map((c) =>
      (c instanceof xjs_Node) ? c.node :
      (c === null) ? '' : c
    ))
    return this
  }

	/** @implements xjs_ParentNode */
  append(...contents: Content[]): this {
    this.node.append(...contents.map((c) =>
      (c instanceof xjs_Node) ? c.node :
      (c === null) ? '' : c
    ))
    return this
  }

	/** @implements xjs_ParentNode */
	querySelector(selector: string): xjs_Element|null {
		let el: Element|null = this.node.querySelector(selector)
		return (el === null) ? null : new xjs_Element(el)
	}

	/** @implements xjs_ParentNode */
	querySelectorAll(selector: string): xjs_Element[] {
		return [...this.node.querySelectorAll(selector)].map((el) => new xjs_Element(el))
	}

	/**
	 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/before|ChildNode#before},
	 * but return this object when done.
	 *
	 * This method exists simply for chaining.
	 *
	 * @todo TODO xjs.ChildNode#before
	 * @see https://dom.spec.whatwg.org/#dom-childnode-before
	 * @param   contents the contents to insert before this node
	 * @returns `this`
	 */
	before(...contents: Content[]): this {
		this.node.before(...contents.map((c) =>
			(c instanceof xjs_Node) ? c.node :
			(c === null) ? '' : c
		))
		return this
	}

	/**
	 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/after|ChildNode#after},
	 * but return this object when done.
	 *
	 * This method exists simply for chaining.
	 *
	 * @todo TODO xjs.ChildNode#after
	 * @see https://dom.spec.whatwg.org/#dom-childnode-after
	 * @param   contents the contents to insert after this node
	 * @returns `this`
	 */
	after(...contents: Content[]): this {
		this.node.after(...contents.map((c) =>
			(c instanceof xjs_Node) ? c.node :
			(c === null) ? '' : c
		))
		return this
	}

  /**
   * Get and set attributes of this element.
   *
   * If no argument is provided, this method does nothing and returns `this`.
   * @returns `this`
   */
  attr(): this;
  /**
   * Get an attribute of this element.
   *
   * If the key is a string and the value is not provided (or `undefined`),
   * then this method returns the string value of the attribute identified by the key.
   * If the attribute exists but is a boolean attribute, the empty string `''` is returned.
   * If no such attribute exists, then `null` is returned.
   *
   * If the key is `''`, this method throws an error.
   *
   * ```js
   * this.attr('itemtype') // get the value of the attribute (or `null` if it had not been set)
   * this.attr('')         // throws, since `''` is not an attribute
   * ```
   *
   * @param   attr the name of the attribute to get (nonempty string)
   * @returns the value of the attribute specified (or `null` if that attribute hasn’t been set)
   * @throws  {RangeError} if `''` is passed as the attribute name
   */
  attr(attr: string): string|null;
  /**
   * Set or remove an attribute of this element.
   *
   * If the key given is a string, and the value is a non-null {@link ValueType} type,
   * then the attribute will be set (or modified) with the result of the value.
   *
   * If the key is a string and the value is `null,`
   * then the attribute identified by the key is removed from this element.
   *
   * If the value is `NaN`, this method throws an error.
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
   * ```js
   * this.attr('itemtype', 'Person') // set an attribute (string)
   * this.attr('data-nthchild', 3)   // set an attribute (number)  (the value will be `"3"`)
   * this.attr('data-block', true)   // set an attribute (boolean) (the value will be `"true"`)
   * this.attr('itemscope', '')      // set a boolean attribute
   * this.attr('itemprop', null)     // remove an attribute
   * this.attr('', 42)               // throws, since `''` is not an attribute
   * this.attr('data-nthchild', NaN) // throws, since `NaN` is not permitted
   * ```
   *
   * @param   attr the name of the attribute to set (nonempty string)
   * @param   value the value to assign to the attribute, or `null` to remove it
   * @returns `this`
   * @throws  {RangeError} if `''` is passed as the attribute name
   * @throws  {Error} if `NaN` is passed as the attribute value
   */
  attr(attr: string, value: ValueType): this;
  /**
   * Set or remove an attribute of this element, using a function.
   *
   * If the key given is a string, and the value is a {@link ValueFunction} type,
   * then the attribute will be set (or modified) with the result of the given function.
   *
   * ```js
   * this.attr('data-id', function () { return this.id() })                    // set an attribute using a function in this xjs.Element’s context
   * this.attr('data-id', function () { return this.id }, { id: 'custom-id' }) // set an attribute using a function in another given context
   * this.attr(''       , function () {})                                      // throws, since `''` is not an attribute
   * this.attr('data-id', function () { return NaN })                          // throws, since `NaN` is not permitted
   * ```
   *
   * @param   attr the name of the attribute to set (nonempty string)
   * @param   value the function to call when assigning a value to the attribute
   * @param   this_arg optionally pass in another object to use as `this` inside the given function
   * @returns `this`
   * @throws  {RangeError} if `''` is passed as the attribute name
   */
  attr(attr: string, value: ValueFunction, this_arg?: unknown): this;
  /**
   * Set or remove attributes of this element, using an object.
   *
   * If an object is provided as the key, then no argument may be provided as the value.
   * The object must have values of the {@link ValueType} type;
   * thus for each key-value pair in the object, this method assigns corresponding
   * attributes. You may use this method with a single object argument to set and/or remove
   * multiple attributes (using `null` to remove).
   *
   * If the key is `{}` or `null`, this method does nothing and returns `this`.
   *
   * ```js
   * this.attr({            // set/remove multiple attributes all at once
   *   itemprop : 'name',
   *   itemscope: '',
   *   itemtype : 'Person',
   *   'data-id': null,
   * })
   * this.attr({})   // do nothing; return `this`
   * this.attr(null) // do nothing; return `this`
   * ```
   *
   * @param   attr an object with {@link ValueType} type values
   * @returns `this`
   */
  attr(attr: ValueObject|null): this;
  attr(attr?: any, value?: any, this_arg: any = this): any {
		return xjs.Object.switch<this|string|null>(xjs.Object.typeOf(attr), {
			'object': (atr: ValueObject) => {
				for (let i in atr) this.attr(i, atr[i])
				return this
			},
			'string': (atr: string) => {
				if (atr.trim() === '') throw new RangeError('Attribute name cannot be empty string.')
				return xjs.Object.switch<this|string|null>(xjs.Object.typeOf(value), {
					'function' : (val: ValueFunction) =>  this     .attr           (atr, val.call(this_arg)),
					'string'   : (val: string       ) => (this.node.setAttribute   (atr, val               ), this),
					'number'   : (val: number       ) => (this.node.setAttribute   (atr, val.toString()    ), this),
					'infinite' : (val: number       ) => (this.node.setAttribute   (atr, val.toString()    ), this),
					'boolean'  : (val: boolean      ) => (this.node.setAttribute   (atr, val.toString()    ), this),
					'null'     : (                  ) => (this.node.removeAttribute(atr                    ), this),
					'undefined': (                  ) =>  this.node.getAttribute   (atr                    ),
					'NaN'      : (val: number       ) => { throw xjs.Number.assertType(val) },
				})(value)
			},
			'null'     : () => this,
			'undefined': () => this,
		})(attr)
  }

  /**
   * Get {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/id|Element#id}.
   * @see https://www.w3.org/TR/dom/#dom-element-id
   * @returns the value of the `id` attribute, or `null` if it had not been set
   */
  id(): string|null;
  /**
   * Set {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/id|Element#id}, and return this object when done.
   *
   * This method exists simply for chaining.
   * This method also takes arguments usable in {@link xjs_Element.attr}.
   *
   * ```js
   * this.id('section1') // set the [id] attribute (string)
   * this.id(42)         // set the [id] attribute (number)  (the value will be `"42"`)
   * this.id(false)      // set the [id] attribute (boolean) (the value will be `"false"`)
   * this.id('')         // set the [id] attribute to the empty string: `[id=""]`
   * this.id(null)       // remove the [id] attribute
   * ```
   * @param   value the value to set for the `id` attribute, or `null` to remove it
   * @returns `this`
   */
  id(value: ValueType): this;
  /**
   * Set {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/id|Element#id}, and return this object when done.
   *
   * This method exists simply for chaining.
   * This method also takes arguments usable in {@link xjs_Element.attr}.
   *
   * ```js
   * this.id(function () { return this.tagName })                             // set the [id] attribute using a function in this xjs.Element’s context
   * this.id(function () { return this.tagName }, { tagName: 'custom-name' }) // set the [id] attribute using a function in another given context
   * ```
   * @param   value the function to call when assigning a value to the attribute
   * @param   this_arg optionally pass in another object to use as `this` inside the given function
   * @returns `this`
   */
  id(value: ValueFunction, this_arg?: unknown): this;
  id(value?: any, this_arg: any = this): any {
		if (!arguments.length) return this.node.id
		if (typeof value === 'string') this.node.id = value
		else this.attr('id', value, this_arg)
		return this
  }

  /**
   * Get {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/className|Element#className}.
   * @see https://www.w3.org/TR/dom/#dom-element-classname
   * @returns the value of the `class` attribute, or `null` if it had not been set
   */
  class(): string|null;
  /**
   * Set {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/className|Element#className}, and return this object when done.
   *
   * This method exists simply for chaining.
   * This method also takes arguments usable in {@link xjs_Element.attr}.
   *
   * ```js
   * this.class('o-Object c-Component') // set the [class] attribute (string)
   * this.class(42)                     // set the [class] attribute (number)  (the value will be `"42"`)
   * this.class(false)                  // set the [class] attribute (boolean) (the value will be `"false"`)
   * this.class('')                     // set the [class] attribute to the empty string: `[class=""]`
   * this.class(null)                   // remove the [class] attribute
   * ```
   * @param   value the value to set for the `class` attribute, or `null` to remove it
   * @returns `this`
   */
  class(value: ValueType): this;
  /**
   * Set {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/className|Element#className}, and return this object when done.
   *
   * This method exists simply for chaining.
   * This method also takes arguments usable in {@link xjs_Element.attr}.
   *
   * ```js
   * this.class(function () { return this.tagName })                             // set the [class] attribute using a function in this xjs.Element’s context
   * this.class(function () { return this.tagName }, { tagName: 'custom-name' }) // set the [class] attribute using a function in another given context
   * ```
   * @param   value the function to call when assigning a value to the attribute
   * @param   this_arg optionally pass in another object to use as `this` inside the given function
   * @returns `this`
   */
  class(value: ValueFunction, this_arg?: unknown): this;
  class(value?: any, this_arg: any = this): any {
		if (!arguments.length) return this.node.className
		if (typeof value === 'string') this.node.className = value
		else this.attr('class', value, this_arg)
		return this
  }

  /**
   * Append one or more tokens to this element’s `[class]` attribute.
   *
   * Argument(s) can also be space-separated tokens.
   *
   * ```js
   * this.addClass('o-Object', 'c-Component')          // add token(s) to the [class] attribute
   * this.addClass('o-Object c-Component', 'h-Helper') // spaces are allowed; they will just be split
   * this.addClass('')                                 // do nothing; return `this`
   * this.addClass()                                   // do nothing; return `this`
   * ```
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
   * Remove one or more tokens from this element’s `[class]` attribute.
   *
   * Argument(s) can also be space-separated tokens.
   *
   * ```js
   * this.removeClass('o-Object', 'c-Component')          // remove token(s) from the [class] attribute
   * this.removeClass('o-Object c-Component', 'h-Helper') // spaces are allowed; they will just be split
   * this.removeClass('')                                 // do nothing; return `this`
   * this.removeClass()                                   // do nothing; return `this`
   * ```
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
   * Replace a segment of this element’s class string with a new string segment.
   *
   * Note: this is not the same as replacing one class *token* for another.
   * For that, use `this.node.classList.replace(old_, new_)`.
   *
   * ```js
   * let element = jsdom.JSDOM.fragment(`<i class="glyphicons glphicons-{{ icon }}"></i>`).querySelector('i')
   * new xjs.Element(element).replaceClassString('{{ icon }}', 'mobile')
   * element.outerHTML // <i class="glyphicons glphicons-mobile"></i>
   * ```
   * @param   old_ the segment of this element’s `[class]` attribute value to remove; might not be a complete token
   * @param   new_ the string with which to replace the removed segment
   * @returns `this`
   */
  replaceClassString(old_: string, new_: string): this {
    this.node.className = this.node.className.replace(old_, new_)
    return this
  }
}
