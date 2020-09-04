import * as path from 'path'

import { Processor, ProcessingFunction } from 'template-processor'

import xjs_HTMLElement from './HTMLElement.class'
import xjs_HTMLTemplateElement from './HTMLTemplateElement.class'


/**
 * Wrapper for HTML `ol` element.
 * @see https://www.w3.org/TR/html52/grouping-content.html#htmlolistelement
 */
export default class xjs_HTMLOListElement extends xjs_HTMLElement {
  /**
   * Return a new `xjs.HTMLTemplateElement` object that renders a `<ol>` filled with `<li>`s.
   *
   * ```js
   * const my_tpl = (await xjs.HTMLOListElement.template())
	 * 	.run((olisttpl) => {
	 * 		new xjs.HTMLUListElement(olisttpl.content().querySelector('ol')).addClass('o-List')
	 * 		new xjs.HTMLLIElement(olisttpl.content().querySelector('template').content.querySelector('li')).addClass('o-List__Item')
	 * 	})
   * const my_processor = new Processor(my_tpl.node, (frag, data, opts) => {
   * 	new xjs.HTMLOListElement(frag.querySelector('ol')).populate((f, d, o) => {
   *       f.querySelector('li').append(d)
   *     }, data, opts)
   *   })
   * my_processor.process([1,2,3,4,5]) // returns:
   * // ```html
   * // <ol class="o-List">
   * //   <template>
   * //     <li class="o-List__Item">1</li>
   * //     <li class="o-List__Item">2</li>
   * //     <li class="o-List__Item">3</li>
   * //     <li class="o-List__Item">4</li>
   * //     <li class="o-List__Item">5</li>
   * //   </template>
   * // </ol>
   * // ```
   * ```
   * @returns a template rendering a `<ol>` element
   */
  static async template(): Promise<xjs_HTMLTemplateElement> {
    return xjs_HTMLTemplateElement.fromFile(path.join(__dirname, '../../src/tpl/x-htmlolistelement.tpl.html')) // relative to `dist`
  }
  /**
   * Synchronous version of {@link xjs_HTMLOListElement.template}.
   * @returns a template rendering a `<ol>` element
   */
  static templateSync(): xjs_HTMLTemplateElement {
    return xjs_HTMLTemplateElement.fromFileSync(path.join(__dirname, '../../src/tpl/x-htmlolistelement.tpl.html')) // relative to `dist`
  }


  /**
   * Construct a new xjs_HTMLOListElement object.
   * @param node the node to wrap
   */
  constructor(node: HTMLOListElement) {
    super(node)
  }
  /**
   * This wrapper’s node.
   */
  get node(): HTMLOListElement { return super.node as HTMLOListElement }

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
	populate<T, U extends object>(instructions: ProcessingFunction<T, U>, dataset: T[], options?: U, this_arg: unknown = this): this {
		Processor.populateList(this.node, instructions, dataset, options, this_arg)
		return this
	}
}
