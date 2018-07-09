import {dev_HTMLDListElement} from '../dev.d'
import xjs_HTMLElement from './HTMLElement.class'

/**
 * Wrapper for HTML `dl` element.
 * @see https://www.w3.org/TR/html/grouping-content.html#htmldlistelement-htmldlistelement
 */
export default class xjs_HTMLDListElement extends xjs_HTMLElement {
  /**
   * @summary Construct a new xjs_HTMLDListElement object.
   * @param node the node to wrap
   */
  constructor(node: HTMLDListElement) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   */
  get node(): dev_HTMLDListElement { return <dev_HTMLDListElement>super.node }
}
