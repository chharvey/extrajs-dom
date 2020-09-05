import * as path from 'path'

import { Processor, ProcessingFunction } from 'template-processor'

import xjs_Populable from '../iface/Populable.iface'
import xjs_HTMLElement from './HTMLElement.class'
import xjs_HTMLTemplateElement from './HTMLTemplateElement.class'


/**
 * Wrapper for HTML `ol` element.
 * @see https://www.w3.org/TR/html52/grouping-content.html#htmlolistelement
 */
export default class xjs_HTMLOListElement extends xjs_HTMLElement implements xjs_Populable {
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

	/** @implements xjs_Populable */
	populate<T, U extends object>(instructions: ProcessingFunction<DocumentFragment, T, U>, dataset: T[], options?: U): this {
		Processor.populateList(this.node, instructions, dataset, options)
		return this
	}
}
