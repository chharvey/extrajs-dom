import {dev_HTMLMetaElement} from '../dev.d'
import {ValueType,ValueFunction} from './Element.class'
import xjs_HTMLElement from './HTMLElement.class'

/**
 * Wrapper for HTML `meta` element.
 * @see https://www.w3.org/TR/html52/document-metadata.html#htmlmetaelement
 */
export default class xjs_HTMLMetaElement extends xjs_HTMLElement {
  /**
   * @summary Construct a new xjs_HTMLMetaElement object.
   * @param node the node to wrap
   */
  constructor(node: HTMLMetaElement) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   */
  get node(): dev_HTMLMetaElement { return super.node as dev_HTMLMetaElement }

  /**
   * @summary Reflect the `name` content attribute.
   * @see https://www.w3.org/TR/html52/document-metadata.html#dom-htmlmetaelement-name
   * @returns the value of the attribute, or `null` if it hasn’t been set
   */
  name(): string|null;
  /**
   * @summary Reflect the `name` content attribute.
   * @see https://www.w3.org/TR/html52/document-metadata.html#dom-htmlmetaelement-name
   * @param   val the value to set, or `null` to remove
   * @returns `this`
   */
  name(val: ValueType): this;
  /**
   * @summary Reflect the `name` content attribute.
   * @see https://www.w3.org/TR/html52/document-metadata.html#dom-htmlmetaelement-name
   * @param   val the function to call when setting the value
   * @param   this_arg optionally pass in another object to use as `this` inside the given function
   * @returns `this`
   */
  name(val: ValueFunction, this_arg?: unknown): this;
  name(val?: any, this_arg: any = this): any {
    return this.attr('name', val, this_arg)
  }

  /**
   * @summary Reflect the `content` content attribute.
   * @see https://www.w3.org/TR/html52/document-metadata.html#dom-htmlmetaelement-content
   * @returns the value of the attribute, or `null` if it hasn’t been set
   */
  content(): string|null;
  /**
   * @param   val the value to set, or `null` to remove
   * @returns `this`
   */
  content(val: ValueType): this;
  /**
   * @param   val the function to call when setting the value
   * @param   this_arg optionally pass in another object to use as `this` inside the given function
   * @returns `this`
   */
  content(val: ValueFunction, this_arg?: unknown): this;
  content(val?: any, this_arg: any = this): any {
    return this.attr('content', val, this_arg)
  }
}
