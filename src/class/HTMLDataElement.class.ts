import {dev_HTMLDataElement} from '../dev.d'
import {ValueArg} from './Element.class'
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
   * @param   val the value to set
   * @param   this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns `this` if setting the attribute, else the value of the attribute (or `null` if it hasn’t been set)
   */
  value(val?: ValueArg, this_arg: any = this): (this|string|null) {
    return this.attr('value', val, this_arg)
  }
}
