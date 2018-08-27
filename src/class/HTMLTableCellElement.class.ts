import {dev_HTMLTableCellElement} from '../dev'
import xjs_HTMLElement from './HTMLElement.class'


/**
 * Wrapper for HTML `th` and `td` elements.
 * @see https://www.w3.org/TR/html52/tabular-data.html#htmltablecellelement
 */
export default class xjs_HTMLTableCellElement extends xjs_HTMLElement {
  /**
   * @summary Construct a new xjs_HTMLTableCellElement object.
   * @param node the node to wrap
   */
  constructor(node: HTMLTableCellElement) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   */
  get node(): dev_HTMLTableCellElement { return <dev_HTMLTableCellElement>super.node }
}
