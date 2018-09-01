import {dev_HTMLDListElement} from '../dev'
import xjs_HTMLElement from './HTMLElement.class'


/**
 * Wrapper for HTML `dl` element.
 * @see https://www.w3.org/TR/html52/grouping-content.html#htmldlistelement
 */
export default class xjs_HTMLDListElement extends xjs_HTMLElement {
  /**
   * Construct a new xjs_HTMLDListElement object.
   * @param node the node to wrap
   */
  constructor(node: HTMLDListElement) {
    super(node)
  }
  /**
   * This wrapper’s node.
   */
  get node(): dev_HTMLDListElement { return super.node as dev_HTMLDListElement }
}
