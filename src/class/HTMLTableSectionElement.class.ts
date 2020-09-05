import { Processor, ProcessingFunction } from 'template-processor'

import xjs_Populable from '../iface/Populable.iface'
import xjs_HTMLElement from './HTMLElement.class'


/**
 * Wrapper for HTML `thead`, `tfoot`, and `tbody` elements.
 * @see https://www.w3.org/TR/html52/tabular-data.html#htmltablesectionelement
 */
export default class xjs_HTMLTableSectionElement extends xjs_HTMLElement implements xjs_Populable {
  /**
   * Construct a new xjs_HTMLTableSectionElement object.
   * @param node the node to wrap
   */
  constructor(node: HTMLTableSectionElement) {
    super(node)
  }
  /**
   * This wrapper’s node.
   */
  get node(): HTMLTableSectionElement { return super.node as HTMLTableSectionElement }

	/** @implements xjs_Populable */
	populate<T, U extends object>(instructions: ProcessingFunction<DocumentFragment, T, U>, dataset: T[], options?: U): this {
		Processor.populateList(this.node, instructions, dataset, options)
		return this
	}
}
