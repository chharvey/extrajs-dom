import { Processor, ProcessingFunction } from 'template-processor'

import xjs_Populable from '../iface/Populable.iface'
import xjs_HTMLElement from './HTMLElement.class'


/**
 * Wrapper for HTML `dl` element.
 * @see https://www.w3.org/TR/html52/grouping-content.html#htmldlistelement
 */
export default class xjs_HTMLDListElement extends xjs_HTMLElement implements xjs_Populable {
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
  get node(): HTMLDListElement { return super.node as HTMLDListElement }

	/** @implements xjs_Populable */
	populate<T, U extends object>(instructions: ProcessingFunction<DocumentFragment, T, U>, dataset: T[], options?: U): this {
		Processor.populateList(this.node, instructions, dataset, options)
		return this
	}
}
