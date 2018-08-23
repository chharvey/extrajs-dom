import {dev_HTMLDataElement} from '../dev.d'
import {ValueType, ValueFunction} from './Element.class'
import xjs_HTMLElement from './HTMLElement.class'

/**
 * Wrapper for HTML `data` element.
 * @see https://www.w3.org/TR/html52/textlevel-semantics.html#the-data-element
 */
export default class xjs_HTMLDataElement extends xjs_HTMLElement {
  /**
   * @summary Construct a new xjs_HTMLDataElement object.
   * @param node the node to wrap
   */
  constructor(node: HTMLDataElement) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   */
  get node(): dev_HTMLDataElement { return <dev_HTMLDataElement>super.node }

  /**
   * @summary Reflect the `value` content attribute.
   * @see https://www.w3.org/TR/html52/textlevel-semantics.html#dom-htmldataelement-value
   * @returns the value of the attribute, or `null` if it hasn’t been set
   */
  value(): string|null;
  /**
   * @param   val the value to set, or `null` to remove
   * @returns `this`
   */
  value(val: ValueType): this;
  /**
   * @param   val the function to call when setting the value
   * @param   this_arg optionally pass in another object to use as `this` inside the given function
   * @returns `this`
   */
  value(val: ValueFunction, this_arg?: any): this;
  value(val?: any, this_arg: any = this): any {
    return this.attr('value', val, this_arg)
  }
}
