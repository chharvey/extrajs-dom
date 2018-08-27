import {dev_HTMLLIElement} from '../dev'
import xjs_HTMLElement from './HTMLElement.class'


/**
 * Wrapper for HTML `li` element.
 * @see https://www.w3.org/TR/html52/grouping-content.html#htmllielement
 */
export default class xjs_HTMLLIElement extends xjs_HTMLElement {
  /**
   * @summary Construct a new xjs_HTMLLIElement object.
   * @param node the node to wrap
   */
  constructor(node: HTMLLIElement) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   */
  get node(): dev_HTMLLIElement { return super.node as dev_HTMLLIElement }
}
