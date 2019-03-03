import { Processor, ProcessingFunction } from 'template-processor'

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
  get node(): HTMLDListElement { return super.node as HTMLDListElement }

	/**
	 * Populate this list with items containing data.
	 *
	 * Call {@link Processor.populateList} on this list.
	 * @param   <T>          the type of the data to fill
	 * @param   <U>          the type of the `options` object
	 * @param   instructions the processing function to use
	 * @param   dataset      the data to populate this list
	 * @param   options      additional processing options for all items
	 * @param   this_arg     the `this` context, if any, in which the instructions is called
	 * @returns `this`
	 */
	populate<T, U extends object>(instructions: ProcessingFunction<DocumentFragment, T, U>, dataset: T[], options?: U, this_arg: unknown = this): this {
		Processor.populateList(this.node, instructions, dataset, options, this_arg)
		return this
	}
}
