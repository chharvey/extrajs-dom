import {ValueType, ValueFunction} from './Element.class'
import xjs_HTMLElement from './HTMLElement.class'


/**
 * Wrapper for HTML `a` element.
 * @see https://www.w3.org/TR/html52/textlevel-semantics.html#htmlanchorelement
 */
export default class xjs_HTMLAnchorElement extends xjs_HTMLElement {
  /**
   * Construct a new xjs_HTMLAnchorElement object.
   * @param node the node to wrap
   */
  constructor(node: HTMLAnchorElement) {
    super(node)
  }
  /**
   * This wrapper’s node.
   */
  get node(): HTMLAnchorElement { return super.node as HTMLAnchorElement }

  /**
   * Reflect the `href` content attribute.
   * @see https://www.w3.org/TR/html52/links.html#dom-htmlhyperlinkelementutils-href
   * @returns the value of the attribute, or `null` if it hasn’t been set
   */
  href(): string|null;
  /**
   * @param   val the value to set, or `null` to remove
   * @returns `this`
   */
  href(val: ValueType): this;
  /**
   * @param   val the function to call when setting the value
   * @param   this_arg optionally pass in another object to use as `this` inside the given function
   * @returns `this`
   */
  href(val: ValueFunction, this_arg?: unknown): this;
  href(val?: any, this_arg: any = this): any {
    return this.attr('href', val, this_arg)
  }

  /**
   * Reflect the `target` content attribute.
   * @see https://www.w3.org/TR/html52/textlevel-semantics.html#dom-htmlanchorelement-target
   * @returns the value of the attribute, or `null` if it hasn’t been set
   */
  target(): string|null;
  /**
   * @param   val the value to set, or `null` to remove
   * @returns `this`
   */
  target(val: ValueType): this;
  /**
   * @param   val the function to call when setting the value
   * @param   this_arg optionally pass in another object to use as `this` inside the given function
   * @returns `this`
   */
  target(val: ValueFunction, this_arg?: unknown): this;
  target(val?: any, this_arg: any = this): any {
    return this.attr('target', val, this_arg)
  }

  /**
   * Reflect the `download` content attribute.
   * @see https://www.w3.org/TR/html52/textlevel-semantics.html#dom-htmlanchorelement-download
   * @returns the value of the attribute, or `null` if it hasn’t been set
   */
  download(): string|null;
  /**
   * @param   val the value to set, or `null` to remove
   * @returns `this`
   */
  download(val: ValueType): this;
  /**
   * @param   val the function to call when setting the value
   * @param   this_arg optionally pass in another object to use as `this` inside the given function
   * @returns `this`
   */
  download(val: ValueFunction, this_arg?: unknown): this;
  download(val?: any, this_arg: any = this): any {
    return this.attr('download', val, this_arg)
  }

  /**
   * Reflect the `rel` content attribute.
   * @see https://www.w3.org/TR/html52/textlevel-semantics.html#dom-htmlanchorelement-rel
   * @returns the value of the attribute, or `null` if it hasn’t been set
   */
  rel(): string|null;
  /**
   * @param   val the value to set, or `null` to remove
   * @returns `this`
   */
  rel(val: ValueType): this;
  /**
   * @param   val the function to call when setting the value
   * @param   this_arg optionally pass in another object to use as `this` inside the given function
   * @returns `this`
   */
  rel(val: ValueFunction, this_arg?: unknown): this;
  rel(val?: any, this_arg: any = this): any {
    return this.attr('rel', val, this_arg)
  }

  /**
   * Reflect the `rev` content attribute.
   * @see https://www.w3.org/TR/html52/textlevel-semantics.html#dom-htmlanchorelement-rev
   * @returns the value of the attribute, or `null` if it hasn’t been set
   */
  rev(): string|null;
  /**
   * @param   val the value to set, or `null` to remove
   * @returns `this`
   */
  rev(val: ValueType): this;
  /**
   * @param   val the function to call when setting the value
   * @param   this_arg optionally pass in another object to use as `this` inside the given function
   * @returns `this`
   */
  rev(val: ValueFunction, this_arg?: unknown): this;
  rev(val?: any, this_arg: any = this): any {
    return this.attr('rel', val, this_arg)
  }

  /**
   * Reflect the `hreflang` content attribute.
   * @see https://www.w3.org/TR/html52/textlevel-semantics.html#dom-htmlanchorelement-hreflang
   * @returns the value of the attribute, or `null` if it hasn’t been set
   */
  hreflang(): string|null;
  /**
   * @param   val the value to set, or `null` to remove
   * @returns `this`
   */
  hreflang(val: ValueType): this;
  /**
   * @param   val the function to call when setting the value
   * @param   this_arg optionally pass in another object to use as `this` inside the given function
   * @returns `this`
   */
  hreflang(val: ValueFunction, this_arg?: unknown): this;
  hreflang(val?: any, this_arg: any = this): any {
    return this.attr('hreflang', val, this_arg)
  }

  /**
   * Reflect the `type` content attribute.
   * @see https://www.w3.org/TR/html52/textlevel-semantics.html#dom-htmlanchorelement-type
   * @returns the value of the attribute, or `null` if it hasn’t been set
   */
  type(): string|null;
  /**
   * @param   val the value to set, or `null` to remove
   * @returns `this`
   */
  type(val: ValueType): this;
  /**
   * @param   val the function to call when setting the value
   * @param   this_arg optionally pass in another object to use as `this` inside the given function
   * @returns `this`
   */
  type(val: ValueFunction, this_arg?: unknown): this;
  type(val?: any, this_arg: any = this): any {
    return this.attr('type', val, this_arg)
  }
}
