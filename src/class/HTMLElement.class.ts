import {dev_HTMLElement} from '../dev.d'
import xjs_Element, {ValueArg} from './Element.class'

const xjs = {
  Object: require('extrajs').Object,
}

/**
 * Wrapper for an HTML element.
 * @see https://www.w3.org/TR/html52/dom.html#htmlelement
 */
export default class xjs_HTMLElement extends xjs_Element {
  /**
   * @summary Construct a new xjs_HTMLElement object.
   * @param node the node to wrap
   */
  constructor(node: HTMLElement) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   */
  get node(): dev_HTMLElement { return <dev_HTMLElement>super.node }

  ////////////////////
  // GLOBAL ATTRIBUTES
  ////////////////////
  /**
   * @summary Reflect the `title` content attribute.
   * @see https://www.w3.org/TR/html52/dom.html#dom-htmlelement-title
   * @returns the value of the attribute, or `null` if it hasn’t been set
   */
  title(): string|null;
  /**
   * @summary Reflect the `title` content attribute.
   * @see https://www.w3.org/TR/html52/dom.html#dom-htmlelement-title
   * @param   val the value to set, or `null` to remove
   * @param   this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns `this`
   */
  title(val: ValueArg, this_arg?: any): this;
  title(val?: any, this_arg: any = this): any {
    return this.attr('title', val, this_arg)
  }

  /**
   * @summary Reflect the `lang` content attribute.
   * @see https://www.w3.org/TR/html52/dom.html#dom-htmlelement-lang
   * @returns the value of the attribute, or `null` if it hasn’t been set
   */
  lang(): string|null;
  /**
   * @summary Reflect the `lang` content attribute.
   * @see https://www.w3.org/TR/html52/dom.html#dom-htmlelement-lang
   * @param   val the value to set, or `null` to remove
   * @param   this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns `this`
   */
  lang(val: ValueArg, this_arg?: any): this;
  lang(val?: any, this_arg: any = this): any {
    return this.attr('lang', val, this_arg)
  }

  /**
   * @summary Reflect the `dir` content attribute.
   * @see https://www.w3.org/TR/html52/dom.html#dom-htmlelement-dir
   * @returns the value of the attribute, or `null` if it hasn’t been set
   */
  dir(): string|null;
  /**
   * @summary Reflect the `dir` content attribute.
   * @see https://www.w3.org/TR/html52/dom.html#dom-htmlelement-dir
   * @param   val the value to set, or `null` to remove
   * @param   this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns `this`
   */
  dir(val: ValueArg, this_arg?: any): this;
  dir(val?: any, this_arg: any = this): any {
    return this.attr('dir', val, this_arg)
  }

  /**
   * @description DEPRECATED.
   * If no argument is provided, this method does nothing and returns `this`.
   * @example
   * this.style()     // do nothing; return `this`
   * @returns `this`
   */
  style(): this;
  /**
   * @summary {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style|HTMLElement#style}, with extended functionality.
   * @description
   * This method manipulates an element’s associated {@link https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration|CSSStyleDeclaration} object.
   *
   * When the given key is a string, it represents the CSS property name to get.
   * It must be given in **kebab-case** format (e.g. `'text-align'`), as specified in
   * {@link https://w3.org/TR/CSS2/syndata.html#declaration|CSS 2.1 | Declarations and properties}.
   *
   * If the key is a string and the value is not provided (or `undefined`),
   * then this method returns the string value of the CSS property identified by the key.
   * If no such property exists, then `null` is returned.
   * (Note that css properties default to the `unset` value---either `inherit` or `initial`,
   * depending on whether the property is inherited or not.)
   *
   * If the key is `''`, this method does nothing and returns `this`.
   *
   * @example
   * this.style('text-align')             // get the value of the `text-align` property (or `null` if it had not been set)
   * this.style('')   // do nothing; return `this`
   *
   * @todo TODO handle case of empty string
   * @see https://www.w3.org/TR/cssom-1/#dom-elementcssinlinestyle-style
   * @param   prop the name of the css property to get (nonempty string)
   * @returns the value of the property specified (or `null` if that property hasn’t been set)
   */
  style(prop: string): string|null;
  /**
   * @summary {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style|HTMLElement#style}, with extended functionality.
   * @description
   * This method manipulates an element’s associated {@link https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration|CSSStyleDeclaration} object.
   *
   * When the given key is a string, it represents the CSS property name to set.
   * It must be given in **kebab-case** format (e.g. `'text-align'`), as specified in
   * {@link https://w3.org/TR/CSS2/syndata.html#declaration|CSS 2.1 | Declarations and properties}.
   *
   * If the key is a string and the value is a non-null {@link ValueArg} type,
   * *except for the empty string `''`,*
   * then the CSS property will be set (or modified) with the result of the given value.
   *
   * If the key is a string and the value is `null` or the empty string `''`,
   * then the CSS property identified by the key is removed from this element.
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
   *
   * @todo TODO handle case of empty string
   * @see https://www.w3.org/TR/cssom-1/#dom-elementcssinlinestyle-style
   * @param   prop the name of the css property to set (nonempty string)
   * @param   value the value to assign to the property, or `null` or `''` to remove it
   * @param   this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns `this`
   */
  style(prop: string, value: ValueArg, this_arg?: any): this;
  /**
   * @summary {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style|HTMLElement#style}, with extended functionality.
   * @description
   * This method manipulates an element’s associated {@link https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration|CSSStyleDeclaration} object.
   *
   * If an object is provided as the key, then no argument may be provided as the value.
   * The object must have values of the {@link ValueArg} type;
   * thus for each key-value pair in the object, this method assigns corresponding
   * CSS properties. You may use this method with a single object argument to set and/or remove
   * multiple properties (using `null` to remove).
   *
   * If the key is `{}` or `null`, this method does nothing and returns `this`.
   *
   * @example
   * this.style({                         // set/remove multiple properties all at once
   *   background  : 'red',
   *   margin      : '1rem',
   *   opacity     : 0.5,
   *   content     : `''`, // sets the css `content: '';`
   *   visibility  : null, // remove the `visibility` property
   *   'text-align': '',   // remove the `text-align` property
   * })
   * this.style({})   // do nothing; return `this`
   * this.style(null) // do nothing; return `this`
   *
   * @see https://www.w3.org/TR/cssom-1/#dom-elementcssinlinestyle-style
   * @param   prop an object with {@link ValueArg} type values
   * @returns `this`
   */
  style(prop: { [index: string]: ValueArg }|null): this;
  /*
   * @summary {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style|HTMLElement#style}, with extended functionality.
   * @description
   * This method manipulates an element’s associated {@link https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration|CSSStyleDeclaration} object.
   *
   * When the given key is a string, it represents the CSS property name to set or get.
   * It must be given in **kebab-case** format (e.g. `'text-align'`), as specified in
   * {@link https://w3.org/TR/CSS2/syndata.html#declaration|CSS 2.1 | Declarations and properties}.
   *
   * If the key is a string and the value is a non-null {@link ValueArg} type,
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
   * The object must have values of the {@link ValueArg} type;
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
   * @param   prop the name of the css property to set or get (nonempty string), or an object with {@link ValueArg} type values
   * @param   value the value to assign to the property, or `null` or `''` to remove it, or `undefined` (or not provided) to get it
   * @param   this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns `this` if setting a property, else the value of the property specified (or `null` if that property hasn’t been set)
   */
  style(prop: any = '', value?: any, this_arg: any = this): any {
    // REVIEW: object lookups too complicated here; using standard switches
    switch (xjs.Object.typeOf(prop)) {
      case 'null': break;
      case 'string':
        if ((<string>prop).trim() === '') break;
        switch (xjs.Object.typeOf(value)) {
          case 'function' : return this.style(prop, (<Function>value).call(this_arg));
          case 'undefined': return this.node.style.getPropertyValue(<string>prop) || null;
          default         :
            switch (value) {
              case ''  :
              case null: this.node.style.removeProperty(<string>prop); break;
              default  : this.node.style.setProperty(<string>prop, (<(string|number|boolean)>value).toString()); break; // string, number, boolean, infinite, NaN
            }
        }
        break;
      case 'object': for (let i in <object>prop) this.style(i, (<{ [index: string]: ValueArg }>prop)[i]); break;
      default: break;
    }
    return this
  }

  /**
   * @description DEPRECATED.
   * If no argument is provided, this method does nothing and returns `this`.
   * @example
   * this.data()     // do nothing; return `this`
   * @returns `this`
   */
  data(): this;
  /**
   * @summary {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset|HTMLElement#dataset}, with extended functionality.
   * @description
   * This method is similar to {@link xjs_Element#attr} in that it sets attributes,
   * except that this method only sets attributes starting with the `data-` prefix, and that
   * the attribute names passed to this method differ from the those passed to {@link xjs_Element#attr}.
   *
   * When the given key is a string, it represents the data- attribute to get.
   * It must not include the prefix `'data-'`, and it must be given in **camelCase** format (e.g. `'hasJs'`), as specified in
   * {@link https://www.w3.org/TR/html52/dom.html#dom-domstringmap-__setter__-name-value-name|HTML 5.2 | DOMStringMap setter}.
   *
   * Note that if you wish to use the HTML attribute syntax **kebab-case** format, as specified in
   * {@link https://www.w3.org/TR/html52/dom.html#embedding-custom-non-visible-data-with-the-data-attributes|HTML 5.2 | custom data attributes},
   * you should use the {@link xjs_Element#attr} method instead, and pass `'data-has-js'` as the attribute name.
   *
   * If the key is a string and the value is not provided (or `undefined`),
   * then this method returns the string value of the data- attribute identified by the key.
   * If the attribute exists but is a boolean attribute, the empty string `''` is returned.
   * If no such attribute exists, then `null` is returned.
   *
   * If the key is `''`, this method does nothing and returns `this`.
   *
   * @example
   * this.data('instanceOf')         // get the value of the `[data-instance-of]` attribute (`null` if it had not been set)
   * this.data('')   // do nothing; return `this`
   *
   * @todo TODO handle case of empty string
   * @see https://www.w3.org/TR/html52/dom.html#dom-htmlelement-dataset
   * @param   data_attr the suffix of the `[data-*]` attribute to get (nonempty string)
   * @returns the value of the attribute specified (or `null` if that attribute hasn’t been set)
   */
  data(data_attr: string): string|null;
  /**
   * @summary {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset|HTMLElement#dataset}, with extended functionality.
   * @description
   * This method is similar to {@link xjs_Element#attr} in that it sets attributes,
   * except that this method only sets attributes starting with the `data-` prefix, and that
   * the attribute names passed to this method differ from the those passed to {@link xjs_Element#attr}.
   *
   * When the given key is a string, it represents the data- attribute to set or get.
   * It must not include the prefix `'data-'`, and it must be given in **camelCase** format (e.g. `'hasJs'`), as specified in
   * {@link https://www.w3.org/TR/html52/dom.html#dom-domstringmap-__setter__-name-value-name|HTML 5.2 | DOMStringMap setter}.
   *
   * Note that if you wish to use the HTML attribute syntax **kebab-case** format, as specified in
   * {@link https://www.w3.org/TR/html52/dom.html#embedding-custom-non-visible-data-with-the-data-attributes|HTML 5.2 | custom data attributes},
   * you should use the {@link xjs_Element#attr} method instead, and pass `'data-has-js'` as the attribute name.
   *
   * If the key is a string and the value is a non-null {@link ValueArg} type,
   * then the data- attribute will be set (or modified) with the result of the given value.
   *
   * If the key is a string and the value is `null,`
   * then the data- attribute identified by the key is removed from this element.
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
   *
   * @todo TODO handle case of empty string
   * @see https://www.w3.org/TR/html52/dom.html#dom-htmlelement-dataset
   * @param   data_attr the suffix of the `[data-*]` attribute to set (nonempty string)
   * @param   value the value to assign to the attribute, or `null` to remove it
   * @param   this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns `this`
   */
  data(data_attr: string, value: ValueArg, this_arg?: any): this;
  /**
   * @summary {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset|HTMLElement#dataset}, with extended functionality.
   * @description
   * This method is similar to {@link xjs_Element#attr} in that it sets attributes,
   * except that this method only sets attributes starting with the `data-` prefix, and that
   * the attribute names passed to this method differ from the those passed to {@link xjs_Element#attr}.
   *
   * If an object is provided as the key, then no argument may be provided as the value.
   * The object’s keys must be in **camelCase** format, as if each key were passed separately.
   * The object must have values of the {@link ValueArg} type;
   * thus for each key-value pair in the object, this method assigns corresponding
   * data- attributes. You may use this method with a single object argument to set and/or remove
   * multiple attributes (using `null` to remove).
   *
   * If the key is `{}` or `null`, this method does nothing and returns `this`.
   *
   * @example
   * this.data({                     // set/remove multiple `[data-*]` attributes all at once
   *   prop  : 'name',
   *   scope : '',
   *   typeOf: 'Person',
   *   id    : null,
   * })
   * this.data({})   // do nothing; return `this`
   * this.data(null) // do nothing; return `this`
   *
   * @see https://www.w3.org/TR/html52/dom.html#dom-htmlelement-dataset
   * @param   data_attr an object with {@link ValueArg} type values
   * @returns `this`
   */
  data(data_attr: { [index: string]: ValueArg }|null): this;
  /*
   * @summary {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset|HTMLElement#dataset}, with extended functionality.
   * @description
   * This method is similar to {@link xjs_Element#attr} in that it sets attributes,
   * except that this method only sets attributes starting with the `data-` prefix, and that
   * the attribute names passed to this method differ from the those passed to {@link xjs_Element#attr}.
   *
   * When the given key is a string, it represents the data- attribute to set or get.
   * It must not include the prefix `'data-'`, and it must be given in **camelCase** format (e.g. `'hasJs'`), as specified in
   * {@link https://www.w3.org/TR/html52/dom.html#dom-domstringmap-__setter__-name-value-name|HTML 5.2 | DOMStringMap setter}.
   *
   * Note that if you wish to use the HTML attribute syntax **kebab-case** format, as specified in
   * {@link https://www.w3.org/TR/html52/dom.html#embedding-custom-non-visible-data-with-the-data-attributes|HTML 5.2 | custom data attributes},
   * you should use the {@link xjs_Element#attr} method instead, and pass `'data-has-js'` as the attribute name.
   *
   * If the key is a string and the value is a non-null {@link ValueArg} type,
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
   * The object must have values of the {@link ValueArg} type;
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
   * @param   data_attr the suffix of the `[data-*]` attribute to set or get (nonempty string), or an object with {@link ValueArg} type values
   * @param   value the value to assign to the attribute, or `null` to remove it, or `undefined` (or not provided) to get it
   * @param   this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns `this` if setting an attribute, else the value of the attribute specified (or `null` if that attribute hasn’t been set)
   */
  data(data_attr: any = '', value?: any, this_arg: any = this): any {
    // REVIEW: object lookups too complicated here; using standard switches
    switch (xjs.Object.typeOf(data_attr)) {
      case 'null': break;
      case 'string':
        if ((<string>data_attr).trim() === '') break;
        switch (xjs.Object.typeOf(value)) {
          case 'function' : return this.data(data_attr, (<Function>value).call(this_arg));
          case 'null'     : delete this.node.dataset[<string>data_attr]; break;
          case 'undefined': let returned: (string|undefined) = this.node.dataset[<string>data_attr]; return (xjs.Object.typeOf(returned) === 'string') ? <string>returned : null;
          default         : this.node.dataset[<string>data_attr] = (<(string|number|boolean)>value).toString(); break; // string, number, boolean, infinite, NaN
        }
        break;
      case 'object': for (let i in <object>data_attr) this.data(i, (<{ [index: string]: ValueArg }>data_attr)[i]); break;
      default: break;
    }
    return this
  }

  ///////////////////
  // USER INTERACTION
  ///////////////////
  /**
   * @summary Reflect the `hidden` content attribute.
   * @see https://www.w3.org/TR/html52/editing.html#dom-htmlelement-hidden
   * @returns the value of the attribute, or `null` if it hasn’t been set
   */
  hidden(): string|null;
  /**
   * @summary Reflect the `hidden` content attribute.
   * @see https://www.w3.org/TR/html52/editing.html#dom-htmlelement-hidden
   * @param   val the value to set, or `null` to remove
   * @param   this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns `this`
   */
  hidden(val: ValueArg, this_arg?: any): this;
  hidden(val?: any, this_arg: any = this): any {
    return this.attr('hidden', val, this_arg)
  }

  /**
   * @summary Reflect the `tabindex` content attribute.
   * @see https://www.w3.org/TR/html52/editing.html#dom-htmlelement-tabindex
   * @returns the value of the attribute, or `null` if it hasn’t been set
   */
  tabIndex(): string|null;
  /**
   * @summary Reflect the `tabindex` content attribute.
   * @see https://www.w3.org/TR/html52/editing.html#dom-htmlelement-tabindex
   * @param   val the value to set, or `null` to remove
   * @param   this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns `this`
   */
  tabIndex(val: ValueArg, this_arg?: any): this;
  tabIndex(val?: any, this_arg: any = this): any {
    return this.attr('tabindex', val, this_arg)
  }
}
