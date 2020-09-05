import { Processor, ProcessingFunction } from 'template-processor'

import xjs_Populable from '../iface/Populable.iface'
import xjs_HTMLElement from './HTMLElement.class'


/**
 * Wrapper for HTML `tr` element.
 * @see https://www.w3.org/TR/html52/tabular-data.html#htmltablerowelement
 */
export default class xjs_HTMLTableRowElement extends xjs_HTMLElement implements xjs_Populable {
  /**
   * Construct a new xjs_HTMLTableRowElement object.
   * @param node the node to wrap
   */
  constructor(node: HTMLTableRowElement) {
    super(node)
  }
  /**
   * This wrapper’s node.
   */
  get node(): HTMLTableRowElement { return super.node as HTMLTableRowElement }

	/** @implements xjs_Populable */
	populate<T, U extends object>(instructions: ProcessingFunction<DocumentFragment, T, U>, dataset: T[], options?: U): this {
		Processor.populateList(this.node, instructions, dataset, options)
		return this
	}
}
