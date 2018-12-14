import {Processor, ProcessingFunction} from 'template-processor'

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
	 * This method appends items to the end of this list.
	 * The items are the result of rendering the given data.
	 * In order to determine how the data is rendered, this `<dl>` element must have
	 * a `<template>` child, which in turn contains at least one `<dt>` followed by at least one `<dd>`.
	 *
	 * Notes:
	 * - This element may contain multiple `<template>` children, but this method uses only the first one.
	 * - This element may also already have any number of `<dt>` or `<dd>` children; they are not affected.
	 *
	 * ```js
	 * let {document} = new jsdom.JSDOM(`
	 * <dl>
	 * 	<template>
	 * 		<dt>{{ name }}</dt>
	 * 		<dd>
	 * 			<a href="{{ url }}">{{ text }}</a>
	 * 		</dd>
	 * 	</template>
	 * </dl>
	 * `).window
	 * let data = [
	 * 	{ "name": "connections", "url": "#0", "text": "Career Connections" },
	 * 	{ "name": "licensure"  , "url": "#1", "text": "Getting Licensed & Certified" },
	 * 	{ "name": "resources"  , "url": "#2", "text": "Career resources" },
	 * 	{ "name": "ethics"     , "url": "#3", "text": "Code of Ethics" }
	 * ]
	 * new xjs_HTMLOListElement(document.querySelector('dl'))
	 * 	.populate(function (f, d, o) {
	 * 		f.querySelector('dt').textContent = d.name
	 * 		f.querySelector('a').href         = d.url
	 * 		f.querySelector('a').textContent  = d.text
	 * 	}, data)
	 * new xjs_HTMLOListElement(document.querySelector('dl'))
	 *	.populate(function (f, d, o) {
	 *		// some code involving `this`
	 *	}, data, {}, other_context)
	 * ```
	 *
	 * @param   <T> the type of the data to fill when processing
	 * @param   <U> the type of the processing options object
	 * @param   instructions a typical {@link ProcessingFunction} to modify the template
	 * @param   dataset      the data to populate the list
	 * @param   options      additional processing options for all items
	 * @param   this_arg     the `this` context, if any, in which the instructions is called
	 * @returns `this`
	 * @throws  {ReferenceError} if this `<dl>` does not contain a `<template>`,
	 *                           or if that `<template>` does not contain 1+ `<dt>` followed by 1+ `<dd>`.
	 */
	populate<T, U extends object>(instructions: ProcessingFunction<T, U>, dataset: T[], options?: U, this_arg: unknown = this): this {
		let template: HTMLTemplateElement|null = this.node.querySelector('template')
		if (template === null) {
			throw new ReferenceError('This <dl> does not have a <template> descendant.')
		}
		if (template.content.children.length < 1) {
			throw new ReferenceError('The <template> must contain at least 1 element.')
		}
		if ([...template.content.querySelectorAll('*')].some((el) => !el.matches('dt, dd'))) {
			throw new TypeError(`The <template> must only contain <dt> or <dd> elements.`)
		}
		if (template.content.querySelector('dt') === null || template.content.querySelector('dd') === null) {
			throw new ReferenceError(`The <template> must contain at least 1 <dt> and at least 1 <dd>.`)
		}
		if ([...template.content.children].indexOf(template.content.querySelector('dt:last-of-type') !) >= [...template.content.children].indexOf(template.content.querySelector('dd:first-of-type') !)) {
			throw new TypeError(`All <dd> elements must follow all <dt> elements inside the <template>.`)
		}
		let processor: Processor<T, U> = new Processor(template, instructions)
		return this.append(...dataset.map((data) => processor.process(data, options, this_arg)))
	}
}
