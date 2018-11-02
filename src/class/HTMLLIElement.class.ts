import xjs_HTMLElement from './HTMLElement.class'


/**
 * Wrapper for HTML `li` element.
 * @see https://www.w3.org/TR/html52/grouping-content.html#htmllielement
 */
export default class xjs_HTMLLIElement extends xjs_HTMLElement {
  /**
   * Construct a new xjs_HTMLLIElement object.
   * @param node the node to wrap
   */
  constructor(node: HTMLLIElement) {
    super(node)
  }
  /**
   * This wrapper’s node.
   */
  get node(): HTMLLIElement { return super.node as HTMLLIElement }
}
