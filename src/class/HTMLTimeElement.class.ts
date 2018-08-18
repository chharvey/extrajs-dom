import {dev_HTMLTimeElement} from '../dev.d'
import {ValueType, ValueFunction} from './Element.class'
import xjs_HTMLElement from './HTMLElement.class'

/**
 * Wrapper for HTML `time` element.
 * @see https://www.w3.org/TR/html52/textlevel-semantics.html#htmltimeelement
 */
export default class xjs_HTMLTimeElement extends xjs_HTMLElement {
  /**
   * @summary Construct a new xjs_HTMLTimeElement object.
   * @param node the node to wrap
   */
  constructor(node: HTMLTimeElement) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   */
  get node(): dev_HTMLTimeElement { return super.node as dev_HTMLTimeElement }

  /**
   * @summary Reflect the `datetime` content attribute.
   * @see https://www.w3.org/TR/html52/textlevel-semantics.html#dom-htmltimeelement-datetime
   * @returns the value of the attribute, or `null` if it hasn’t been set
   */
  dateTime(): string|null;
  /**
   * @description This method accepts a {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date|Date} object as the value to set.
   * @param   val the value to set, or `null` to remove
   * @returns `this`
   */
  dateTime(val: ValueType|Date): this;
  /**
   * @param   val the function to call when setting the value
   * @param   this_arg optionally pass in another object to use as `this` inside the given function
   * @returns `this`
   */
  dateTime(val: ValueFunction, this_arg?: unknown): this;
  dateTime(val?: any, this_arg: any = this): any {
    return this.attr('datetime', (val instanceof Date) ? val.toISOString() : val, this_arg)
  }
}
