import {ProcessingFunction} from 'template-processor'

import xjs_HTMLElement from '../class/HTMLElement.class'



/**
 * A list-like HTMLElement that can be populated with data.
 */
export default interface xjs_Populable extends xjs_HTMLElement {
	/**
	 * Populate this element with items containing data.
	 *
	 * Call {@link Processor.populateList} on this list.
	 * @typeparam T          the type of the data to fill
	 * @typeparam U          the type of the `options` object
	 * @param   instructions the processing function to use
	 * @param   dataset      the data to populate this list
	 * @param   options      additional processing options for all items
	 * @returns `this`
	 */
	populate<T, U extends object>(
		instructions: ProcessingFunction<DocumentFragment, T, U>,
		dataset: T[],
		options?: U,
	): this;
}
