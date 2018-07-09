import {dev_HTMLLIElement} from '../dev.d'
import xjs_HTMLElement from './HTMLElement.class'

/**
 * Wrapper for HTML `li` element.
 * @see https://www.w3.org/TR/html/grouping-content.html#htmllielement-htmllielement
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
  get node(): dev_HTMLLIElement { return <dev_HTMLLIElement>super.node }
}
