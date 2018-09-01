import * as xjs from 'extrajs'

import {dev_HTMLElement} from '../dev'
import xjs_Element, {ValueType, ValueObject, ValueFunction} from './Element.class'


/**
 * Wrapper for an HTML element.
 * @see https://www.w3.org/TR/html52/dom.html#htmlelement
 */
export default class xjs_HTMLElement extends xjs_Element {
  /**
   * Construct a new xjs_HTMLElement object.
   * @param node the node to wrap
   */
  constructor(node: HTMLElement) {
    super(node)
  }
  /**
   * This wrapper’s node.
   */
  get node(): dev_HTMLElement { return super.node as dev_HTMLElement }

  /**
   * Reflect the `title` content attribute.
   * @see https://www.w3.org/TR/html52/dom.html#dom-htmlelement-title
   * @returns the value of the attribute, or `null` if it hasn’t been set
   */
  title(): string|null;
  /**
   * @param   val the value to set, or `null` to remove
   * @returns `this`
   */
  title(val: ValueType): this;
  /**
   * @param   val the function to call when setting the value
   * @param   this_arg optionally pass in another object to use as `this` inside the given function
   * @returns `this`
   */
  title(val: ValueFunction, this_arg?: unknown): this;
  title(val?: any, this_arg: any = this): any {
    return this.attr('title', val, this_arg)
  }

  /**
   * Reflect the `lang` content attribute.
   * @see https://www.w3.org/TR/html52/dom.html#dom-htmlelement-lang
   * @returns the value of the attribute, or `null` if it hasn’t been set
   */
  lang(): string|null;
  /**
   * @param   val the value to set, or `null` to remove
   * @returns `this`
   */
  lang(val: ValueType): this;
  /**
   * @param   val the function to call when setting the value
   * @param   this_arg optionally pass in another object to use as `this` inside the given function
   * @returns `this`
   */
  lang(val: ValueFunction, this_arg?: unknown): this;
  lang(val?: any, this_arg: any = this): any {
    return this.attr('lang', val, this_arg)
  }

  /**
   * Reflect the `dir` content attribute.
   * @see https://www.w3.org/TR/html52/dom.html#dom-htmlelement-dir
   * @returns the value of the attribute, or `null` if it hasn’t been set
   */
  dir(): string|null;
  /**
   * @param   val the value to set, or `null` to remove
   * @returns `this`
   */
  dir(val: ValueType): this;
  /**
   * @param   val the function to call when setting the value
   * @param   this_arg optionally pass in another object to use as `this` inside the given function
   * @returns `this`
   */
  dir(val: ValueFunction, this_arg?: unknown): this;
  dir(val?: any, this_arg: any = this): any {
    return this.attr('dir', val, this_arg)
  }

  /**
   * Reflect the `hidden` content attribute.
   * @see https://www.w3.org/TR/html52/editing.html#dom-htmlelement-hidden
   * @returns the value of the attribute, or `null` if it hasn’t been set
   */
  hidden(): string|null;
  /**
   * @param   val the value to set, or `null` to remove
   * @returns `this`
   */
  hidden(val: ValueType): this;
  /**
   * @param   val the function to call when setting the value
   * @param   this_arg optionally pass in another object to use as `this` inside the given function
   * @returns `this`
   */
  hidden(val: ValueFunction, this_arg?: unknown): this;
  hidden(val?: any, this_arg: any = this): any {
    return this.attr('hidden', val, this_arg)
  }

  /**
   * Reflect the `tabindex` content attribute.
   * @see https://www.w3.org/TR/html52/editing.html#dom-htmlelement-tabindex
   * @returns the value of the attribute, or `null` if it hasn’t been set
   */
  tabIndex(): string|null;
  /**
   * @param   val the value to set, or `null` to remove
   * @returns `this`
   */
  tabIndex(val: ValueType): this;
  /**
   * @param   val the function to call when setting the value
   * @param   this_arg optionally pass in another object to use as `this` inside the given function
   * @returns `this`
   */
  tabIndex(val: ValueFunction, this_arg?: unknown): this;
  tabIndex(val?: any, this_arg: any = this): any {
    return this.attr('tabindex', val, this_arg)
  }

  /**
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style|HTMLElement#style}, with extended functionality.
   *
   * This method manipulates an element’s associated {@link https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration|CSSStyleDeclaration} object.
   *
   * If no argument is provided, this method does nothing and returns `this`.
   *
   * When the given key is a string, it represents the CSS property name to get.
   * It must be given in **kebab-case** format (e.g. `'text-align'`), as specified in
   * {@link https://w3.org/TR/CSS2/syndata.html#declaration|CSS 2.1 | Declarations and properties}.
   *
   * @returns `this`
   */
  style(): this;
  /**
   * Get a style of this element.
   *
   * If the key is a string and the value is not provided (or `undefined`),
   * then this method returns the string value of the CSS property identified by the key.
   * If no such property exists, then `null` is returned.
   * (Note that css properties default to the `unset` value---either `inherit` or `initial`,
   * depending on whether the property is inherited or not.)
   *
   * If the key is `''`, this method throws an error.
   *
   * ```js
   * this.style('text-align') // get the value of the `text-align` property (or `null` if it had not been set)
   * this.style('')           // throws, since `''` is not a property
   * ```
   *
   * @see https://www.w3.org/TR/cssom-1/#dom-elementcssinlinestyle-style
   * @param   prop the name of the css property to get (nonempty string)
   * @returns the value of the property specified (or `null` if that property hasn’t been set)
   * @throws  {RangeError} if the empty string is passed as the property name
   */
  style(prop: string): string|null;
  /**
   * Set or remove a style of this element.
   *
   * If the key is a string and the value is a non-null *or non-empty string* {@link ValueType} type,
   * then the CSS property will be set (or modified) with the result of the given value.
   *
   * If the key is a string and the value is `null` *or `''`*,
   * then the CSS property identified by the key is removed from this element.
   *
   * ```js
   * this.style('background', 'red')     // set the `background` property (string) (the value will be `red`)
   * this.style('opacity', 0.5)          // set the `opacity` property (number)
   * this.style('content', false)        // set the `content` property (boolean)
   * this.style('content', '\'truthy\'') // set the `content` property (quoted string, must be escaped) (the value will be `'truthy'`)
   * this.style('content', '"truthy"')   // or you could use double-quotes
   * this.style('content', `'truthy'`)   // or you could use a template literal
   * this.style('font-weight', 'bold')   // set the `font-weight` property
   * this.style('font-style', null)      // remove the `font-style` property
   * this.style('font-style', '')        // remove the `font-style` property // *note that this syntax differs from the typical syntax shown by xjs.Element#attr
   * this.attr('', 42)                   // throws, since `''` is not a property
   * ```
   *
   * @see https://www.w3.org/TR/cssom-1/#dom-elementcssinlinestyle-style
   * @param   prop the name of the css property to set (nonempty string)
   * @param   value the value to assign to the property, or `null` or `''` to remove it
   * @returns `this`
   * @throws  {RangeError} if the empty string is passed as the property name
   */
  style(prop: string, value: ValueType): this;
  /**
   * Set or remove a style of this element, using a function.
   *
   * If the key is a string and the value is a {@link ValueFunction} type,
   * then the CSS property will be set (or modified) with the result of the given function.
   *
   * ```js
   * this.style('justify-content', function () { return this.data('jc') })                 // set the `justify-content` property using a function in this xjs.HTMLElement’s context
   * this.style('justify-content', function () { return this.jc }, { jc: 'space-around' }) // set the `justify-content` property using a function in another given context
   * this.style('', function () {})                                                        // throws, since `''` is not a property
   * ```
   *
   * @see https://www.w3.org/TR/cssom-1/#dom-elementcssinlinestyle-style
   * @param   prop the name of the css property to set (nonempty string)
   * @param   value the function to call when assigning a value to the property
   * @param   this_arg optionally pass in another object to use as `this` inside the given function
   * @returns `this`
   * @throws  {RangeError} if the empty string is passed as the property name
   */
  style(prop: string, value: ValueFunction, this_arg?: unknown): this;
  /**
   * Set or remove a style of this element, using an object.
   *
   * If an object is provided as the key, then no argument may be provided as the value.
   * The object must have values of the {@link ValueType} type;
   * thus for each key-value pair in the object, this method assigns corresponding
   * CSS properties. You may use this method with a single object argument to set and/or remove
   * multiple properties (using `null` *or `''`* to remove).
   *
   * If the key is `{}` or `null`, this method does nothing and returns `this`.
   *
   * ```js
   * this.style({            // set/remove multiple properties all at once
   *   background  : 'red',
   *   margin      : '1rem',
   *   opacity     : 0.5,
   *   content     : `''`,   // sets the css `content: '';`
   *   visibility  : null,   // remove the `visibility` property
   *   'text-align': '',     // remove the `text-align` property
   * })
   * this.style({})   // do nothing; return `this`
   * this.style(null) // do nothing; return `this`
   * ```
   *
   * @see https://www.w3.org/TR/cssom-1/#dom-elementcssinlinestyle-style
   * @param   prop an object with {@link ValueType} type values
   * @returns `this`
   */
  style(prop: ValueObject|null): this;
  style(prop?: any, value?: any, this_arg: any = this): any {
		return xjs.Object.switch<this|string|null>(xjs.Object.typeOf(prop), {
			'object': (prp: ValueObject) => {
				for (let i in prp) this.style(i, prp[i])
				return this
			},
			'string': (prp: string) => {
				if (prp.trim() === '') throw new RangeError('Property name cannot be empty string.')
				return xjs.Object.switch<this|string|null>(xjs.Object.typeOf(value), {
					'function' : (val: ValueFunction) => this.style(prp, val.call(this_arg)),
					'string'   : (val: string)        => (val !== '') ? this.node.style.setProperty(prp, val           ) || this : this.style(prp, null),
					'number'   : (val: number)        =>                this.node.style.setProperty(prp, val.toString()) || this,
					'boolean'  : (val: boolean)       =>                this.node.style.setProperty(prp, val.toString()) || this,
					'null'     : ()                   =>                this.node.style.removeProperty(prp).slice(0,0)   || this,
					'undefined': ()                   =>                this.node.style.getPropertyValue(prp)            || null,
				})(value)
			},
			'null'     : () => this,
			'undefined': () => this,
		})(prop)
  }

  /**
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset|HTMLElement#dataset}, with extended functionality.
   *
   * This method is similar to {@link xjs_Element.attr} in that it sets/gets attributes,
   * except that this method only sets/gets attributes starting with the `data-` prefix, and that
   * the attribute names passed to this method differ from the those passed to {@link xjs_Element.attr}.
   *
   * If no argument is provided, this method does nothing and returns `this`.
   *
   * When the given key is a string, it represents the data- attribute to get.
   * It must not include the prefix `'data-'`, and it must be given in **camelCase** format (e.g. `'hasJs'`), as specified in
   * {@link https://www.w3.org/TR/html52/dom.html#dom-domstringmap-__setter__-name-value-name|HTML 5.2 | DOMStringMap setter}.
   * Note that if you wish to use the HTML attribute syntax **kebab-case** format, as specified in
   * {@link https://www.w3.org/TR/html52/dom.html#embedding-custom-non-visible-data-with-the-data-attributes|HTML 5.2 | custom data attributes},
   * you should use the {@link xjs_Element.attr} method instead, and pass `'data-has-js'` as the attribute name.
   *
   * @returns `this`
   */
  data(): this;
  /**
   * Get a data- attribute of this element.
   *
   * If the key is a string and the value is not provided (or `undefined`),
   * then this method returns the string value of the data- attribute identified by the key.
   * If the attribute exists but is a boolean attribute, the empty string `''` is returned.
   * If no such attribute exists, then `null` is returned.
   *
   * If the key is `''`, this method throws an error.
   *
   * ```js
   * this.data('instanceOf') // get the value of the `[data-instance-of]` attribute (`null` if it had not been set)
   * this.data('')           // throws, since `''` is not an attribute
   * ```
   *
   * @see https://www.w3.org/TR/html52/dom.html#dom-htmlelement-dataset
   * @param   data_attr the suffix of the `[data-*]` attribute to get (nonempty string)
   * @returns the value of the attribute specified (or `null` if that attribute hasn’t been set)
   * @throws  {RangeError} if the empty string is passed as the data-attribute name
   */
  data(data_attr: string): string|null;
  /**
   * Set or remove a data- attribute of this element.
   *
   * If the key is a string and the value is a non-null {@link ValueType} type,
   * then the data- attribute will be set (or modified) with the result of the given value.
   *
   * If the key is a string and the value is `null,`
   * then the data- attribute identified by the key is removed from this element.
   *
   * ```js
   * this.data('typeof', 'my type')  // set the `[data-typeof]` attribute (string)
   * this.data('typeof', 42)         // set the `[data-typeof]` attribute (number)  (the value will be `"42"`)
   * this.data('typeof', true)       // set the `[data-typeof]` attribute (boolean) (the value will be `"true"`)
   * this.data('typeOf', 'my type')  // set the `[data-type-of]` attribute
   * this.data('type-of', 'my type') // ERROR! "Uncaught DOMException: Failed to set the 'type-of' property on 'DOMStringMap': 'type-of' is not a valid property name."
   * this.data('ID', 'my-id')        // set the `[data--i-d]` attribute *(probably not intended)*
   * this.data('typeOf', '')         // set the `[data-type-of]` attribute to the empty string: `[data-type-of=""]`
   * this.data('instanceOf', null)   // remove the `[data-instance-of]` attribute
   * this.attr('', 42)               // throws, since `''` is not an attribute
   * ```
   *
   * @see https://www.w3.org/TR/html52/dom.html#dom-htmlelement-dataset
   * @param   data_attr the suffix of the `[data-*]` attribute to set (nonempty string)
   * @param   value the value to assign to the attribute, or `null` to remove it
   * @returns `this`
   * @throws  {RangeError} if the empty string is passed as the data-attribute name
   */
  data(data_attr: string, value: ValueType): this;
  /**
   * Set or remove a data- attribute of this element, using a function.
   *
   * If the key is a string and the value is a {@link ValueFunction} type,
   * then the data- attribute will be set (or modified) with the result of the given function.
   *
   * ```js
   * this.data('id', function () { return this.id() })                    // set the `[data-id]` attribute using a function in this xjs.HTMLElement’s context
   * this.data('id', function () { return this.id }, { id: 'custom-id' }) // set the `[data-id]` attribute using a function in another given context
   * this.data('', function () {})                                        // throws, since `''` is not an attribute
   * ```
   *
   * @see https://www.w3.org/TR/html52/dom.html#dom-htmlelement-dataset
   * @param   data_attr the suffix of the `[data-*]` attribute to set (nonempty string)
   * @param   value the function to call when assigning a value to the attribute
   * @param   this_arg optionally pass in another object to use as `this` inside the given function
   * @returns `this`
   * @throws  {RangeError} if the empty string is passed as the data-attribute name
   */
  data(data_attr: string, value: ValueFunction, this_arg?: unknown): this;
  /**
   * Set or remove a data- attribute of this element, using an object.
   *
   * If an object is provided as the key, then no argument may be provided as the value.
   * The object’s keys must be in **camelCase** format, as if each key were passed separately.
   * The object must have values of the {@link ValueType} type;
   * thus for each key-value pair in the object, this method assigns corresponding
   * data- attributes. You may use this method with a single object argument to set and/or remove
   * multiple attributes (using `null` to remove).
   *
   * If the key is `{}` or `null`, this method does nothing and returns `this`.
   *
   * ```js
   * this.data({         // set/remove multiple `[data-*]` attributes all at once
   *   prop  : 'name',
   *   scope : '',
   *   typeOf: 'Person',
   *   id    : null,
   * })
   * this.data({})   // do nothing; return `this`
   * this.data(null) // do nothing; return `this`
   * ```
   *
   * @see https://www.w3.org/TR/html52/dom.html#dom-htmlelement-dataset
   * @param   data_attr an object with {@link ValueType} type values
   * @returns `this`
   */
  data(data_attr: ValueObject|null): this;
  data(data_attr?: any, value?: any, this_arg: any = this): any {
		return xjs.Object.switch<this|string|null>(xjs.Object.typeOf(data_attr), {
			'object': (atr: ValueObject) => {
				for (let i in atr) this.data(i, atr[i])
				return this
			},
			'string': (atr: string) => {
				if (atr.trim() === '') throw new RangeError('Data-Attribute name cannot be empty string.')
				return xjs.Object.switch<this|string|null>(xjs.Object.typeOf(value), {
					'function' : (val: ValueFunction) => this.data(atr, val.call(this_arg)),
					'string'   : (val: string)        => { this.node.dataset[atr] = val           ; return this },
					'number'   : (val: number)        => { this.node.dataset[atr] = val.toString(); return this },
					'boolean'  : (val: boolean)       => { this.node.dataset[atr] = val.toString(); return this },
					'null'     : ()                   => { delete this.node.dataset[atr]          ; return this },
					'undefined': () => {
						const returned: string|undefined = this.node.dataset[atr]
						return (typeof returned === 'string') ? returned : null
					},
				})(value)
			},
			'null'     : () => this,
			'undefined': () => this,
		})(data_attr)
  }
}
