import { Processor, ProcessingFunction } from 'template-processor'

import xjs_HTMLElement from './HTMLElement.class'


/**
 * Wrapper for HTML `tr` element.
 * @see https://www.w3.org/TR/html52/tabular-data.html#htmltablerowelement
 */
export default class xjs_HTMLTableRowElement extends xjs_HTMLElement {
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
