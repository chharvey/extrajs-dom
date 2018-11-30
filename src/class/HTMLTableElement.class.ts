import {Processor, ProcessingFunction} from 'template-processor'

import xjs_HTMLElement from './HTMLElement.class'


/**
 * Wrapper for HTML `table` element.
 * @see https://www.w3.org/TR/html52/tabular-data.html#htmltableelement
 */
export default class xjs_HTMLTableElement extends xjs_HTMLElement {
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
	 * Populate this list with items containing data.
	 *
	 * This method appends items to the end of this list.
	 * The items are the result of rendering the given data.
	 * In order to determine how the data is rendered, this `<table>` element must have
	 * a `<template>` child, which in turn has a single child that is a `<tbody>`.
	 *
	 * Notes:
	 * - This element may contain multiple `<template>` children, but this method uses only the first one.
	 * - This element may also already have any number of `<tbody>` children; they are not affected.
	 *
	 * ```js
	 * let {document} = new jsdom.JSDOM(`
	 * <table>
	 * 	<template>
	 * 		<tbody>...</tbody>
	 * 	</template>
	 * <table>
	 * `).window
	 * let data = [...]
	 * new xjs_HTMLTableElement(document.querySelector('table'))
	 * 	.populate(function (f, d, o) { ... }, data)
	 * new xjs_HTMLTableElement(document.querySelector('table'))
	 * 	.populate(function (f, d, o) {
	 * 		// some code involving `this`
	 * 	}, data, {}, other_context)
	 * ```
	 *
	 * @param   <T> the type of the data to fill
	 * @param   <U> the type of the `options` object
	 * @param   instructions a typical {@link ProcessingFunction} to modify the template
	 * @param   dataset the data to populate the list
	 * @param   options additional processing options for all items
	 * @param   this_arg provide a `this` context to the processing function
	 * @returns `this`
	 * @throws  {ReferenceError} if this `<table>` does not contain a `<template>`,
	 *                           or if that `<template>` does not contain exactly 1 `<tbody>`.
	 */
	populate<T, U extends object>(instructions: ProcessingFunction<T, U>, dataset: T[], options?: U, this_arg: unknown = this): this {
		let template: HTMLTemplateElement|null = this.node.querySelector('template')
		if (template === null) {
			throw new ReferenceError('This <table> does not have a <template> descendant.')
		}
		if (template.content.children.length !== 1 || !template.content.children[0].matches('tbody')) {
			throw new ReferenceError('The <template> must contain exactly 1 element, which must be a <tbody>.')
		}
		let processor: Processor<T, U> = new Processor(template, instructions)
		return this.append(...dataset.map((data) => processor.process(data, options, this_arg)))
	}
}
