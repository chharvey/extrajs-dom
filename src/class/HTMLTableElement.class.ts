import { Processor, ProcessingFunction } from 'template-processor'

import xjs_Populable from '../iface/Populable.iface'
import xjs_HTMLElement from './HTMLElement.class'
import xjs_HTMLTableSectionElement from './HTMLTableSectionElement.class'


/**
 * Wrapper for HTML `table` element.
 * @see https://www.w3.org/TR/html52/tabular-data.html#htmltableelement
 */
export default class xjs_HTMLTableElement extends xjs_HTMLElement implements xjs_Populable {
	/**
	 * Construct a new xjs_HTMLTableElement object.
	 * @param node the node to wrap
	 */
	constructor(node: HTMLTableElement) {
		super(node)
	}
	/**
	 * This wrapper’s node.
	 */
	get node(): HTMLTableElement { return super.node as HTMLTableElement }

	/**
	 * Get this table’s `<caption>` element, if it has one, otherwise return `null`.
	 * @see https://www.w3.org/TR/html52/tabular-data.html#dom-htmltableelement-caption
	 * @returns this table’s `<caption>` child, or `null` if it does not exist
	 */
	caption(): HTMLTableCaptionElement|null;
	/**
	 * Set or remove this table’s `<caption>` element.
	 * @param   caption the `<caption>` to set, or `null` to remove it
	 * @returns `this`
	 */
	caption(caption: HTMLTableCaptionElement|null): this;
	caption(caption?: any): any {
		if (arguments.length === 0) return this.node.caption
		this.node.caption = caption
		return this
	}

	/**
	 * Get this table’s `<thead>` element, if it has one, otherwise return `null`.
	 * @see https://www.w3.org/TR/html52/tabular-data.html#dom-htmltableelement-thead
	 * @returns this table’s `<thead>` child, or `null` if it does not exist
	 */
	tHead(): HTMLTableSectionElement|null;
	/**
	 * Set or remove this table’s `<thead>` element.
	 * @param   header the `<thead>` to set, or `null` to remove it
	 * @returns `this`
	 */
	tHead(header: xjs_HTMLTableSectionElement|HTMLTableSectionElement|null): this;
	tHead(header?: any): any {
		if (arguments.length === 0) return this.node.tHead
		this.node.tHead = (header instanceof xjs_HTMLTableSectionElement) ? header.node : header
		return this
	}

	/**
	 * Get this table’s `<tfoot>` element, if it has one, otherwise return `null`.
	 * @see https://www.w3.org/TR/html52/tabular-data.html#dom-htmltableelement-tfoot
	 * @returns this table’s `<tfoot>` child, or `null` if it does not exist
	 */
	tFoot(): HTMLTableSectionElement|null;
	/**
	 * Set or remove this table’s `<tfoot>` element.
	 * @param   footer the `<tfoot>` to set, or `null` to remove it
	 * @returns `this`
	 */
	tFoot(footer: xjs_HTMLTableSectionElement|HTMLTableSectionElement|null): this;
	tFoot(footer?: any): any {
		if (arguments.length === 0) return this.node.tFoot
		this.node.tFoot = (footer instanceof xjs_HTMLTableSectionElement) ? footer.node : footer
		return this
	}

	/** @implements xjs_Populable */
	populate<T, U extends object>(instructions: ProcessingFunction<DocumentFragment, T, U>, dataset: T[], options?: U): this {
		Processor.populateList(this.node, instructions, dataset, options)
		return this
	}
}
