import * as path from 'path'

import { Processor, ProcessingFunction } from 'template-processor'

import xjs_HTMLElement from './HTMLElement.class'
import xjs_HTMLTemplateElement from './HTMLTemplateElement.class'


/**
 * Wrapper for HTML `ul` element.
 * @see https://www.w3.org/TR/html52/grouping-content.html#htmlulistelement
 */
export default class xjs_HTMLUListElement extends xjs_HTMLElement {
  /**
   * Return a new `xjs.HTMLTemplateElement` object that renders a `<ul>` filled with `<li>`s.
   *
   * ```js
   * const my_tpl = (await xjs.HTMLUListElement.template())
	 * 	.run((ulisttpl) => {
	 * 		new xjs.HTMLUListElement(ulisttpl.content().querySelector('ul')).addClass('o-List')
	 * 		new xjs.HTMLLIElement(ulisttpl.content().querySelector('template').content.querySelector('li')).addClass('o-List__Item')
	 * 	})
   * const my_processor = new Processor(my_tpl.node, (frag, data, opts) => {
   * 	new xjs.HTMLUListElement(frag.querySelector('ul')).populate((f, d, o) => {
   *       f.querySelector('li').append(d)
   *     }, data, opts)
   *   })
   * my_processor.process([1,2,3,4,5]) // returns:
   * // ```html
   * // <ul class="o-List">
   * //   <template>
   * //     <li class="o-List__Item">1</li>
   * //     <li class="o-List__Item">2</li>
   * //     <li class="o-List__Item">3</li>
   * //     <li class="o-List__Item">4</li>
   * //     <li class="o-List__Item">5</li>
   * //   </template>
   * // </ul>
   * // ```
   * ```
   * @returns a template rendering a `<ul>` element
   */
  static async template(): Promise<xjs_HTMLTemplateElement> {
    return xjs_HTMLTemplateElement.fromFile(path.join(__dirname, '../../src/tpl/x-htmlulistelement.tpl.html')) // relative to `dist`
  }
  /**
   * Synchronous version of {@link xjs_HTMLUListElement.template}.
   * @returns a template rendering a `<ul>` element
   */
  static templateSync(): xjs_HTMLTemplateElement {
    return xjs_HTMLTemplateElement.fromFileSync(path.join(__dirname, '../../src/tpl/x-htmlulistelement.tpl.html')) // relative to `dist`
  }


  /**
   * Construct a new xjs_HTMLUListElement object.
   * @param node the node to wrap
   */
  constructor(node: HTMLUListElement) {
    super(node)
  }
  /**
   * This wrapper’s node.
   */
  get node(): HTMLUListElement { return super.node as HTMLUListElement }

	/**
	 * Populate this list with items containing data.
	 *
	 * Call {@link Processor.populateList} on this list.
	 * @param   <T>          the type of the data to fill
	 * @param   <U>          the type of the `options` object
	 * @param   instructions the processing function to use
	 * @param   dataset      the data to populate this list
	 * @param   options      additional processing options for all items
	 * @returns `this`
	 */
	populate<T, U extends object>(instructions: ProcessingFunction<DocumentFragment, T, U>, dataset: T[], options?: U): this {
		Processor.populateList(this.node, instructions, dataset, options)
		return this
	}
}
