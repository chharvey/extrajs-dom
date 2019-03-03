import { Content } from '../ambient.d'
import xjs_Element from '../class/Element.class'


/**
 * Wrapper for a ParentNode.
 * @see https://www.w3.org/TR/dom/#interface-parentnode
 */
export default interface xjs_ParentNode {
	/**
	 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/prepend|ParentNode#prepend},
	 * but return this object when done.
	 *
	 * This method exists simply for chaining.
	 *
	 * ```js
	 * let strong = document.createElement('strong')
	 * strong.textContent = 'hello'
	 * let em = document.createElement('em')
	 * let mark = document.createElement('mark')
	 *
	 * this.prepend(...[
	 * 	strong,                                       // DOM Node
	 * 	` to the `,                                   // string
	 * 	new Comment(`great`),                         // DOM Node
	 * 	`<small>big</small> `,                        // string with HTML
	 * 	new xjs.Element(em).addContent(`world`).node, // DOM Node (unwrapped)
	 * 	null,                                         // null
	 * 	new xjs.Element(mark).addContent(`!`),        // wrapped DOM Node
	 * ]).node.querySelector('body').innerHTML
	 * // `<strong>hello</strong> to the <!--great--><small>big</small> <em>world</em><mark>!</mark>`
	 * ```
	 * @see https://dom.spec.whatwg.org/#dom-parentnode-prepend
	 * @param   contents the contents to prepend
	 * @returns `this`
	 */
	prepend(...contents: Content[]): this;

	/**
	 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/append|ParentNode#append},
	 * but return this object when done.
	 *
	 * This method exists simply for chaining.
	 *
	 * ```js
	 * let strong = document.createElement('strong')
	 * strong.textContent = 'hello'
	 * let em = document.createElement('em')
	 * let mark = document.createElement('mark')
	 *
	 * this.append(...[
	 * 	strong,                                       // DOM Node
	 * 	` to the `,                                   // string
	 * 	new Comment(`great`),                         // DOM Node
	 * 	`<small>big</small> `,                        // string with HTML
	 * 	new xjs.Element(em).addContent(`world`).node, // DOM Node (unwrapped)
	 * 	null,                                         // null
	 * 	new xjs.Element(mark).addContent(`!`),        // wrapped DOM Node
	 * ]).node.querySelector('body').innerHTML
	 * // `<strong>hello</strong> to the <!--great--><small>big</small> <em>world</em><mark>!</mark>`
	 * ```
	 * @see https://dom.spec.whatwg.org/#dom-parentnode-append
	 * @param   contents the contents to append
	 * @returns `this`
	 */
	append(...contents: Content[]): this;

	/**
	 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/querySelector|ParentNode#querySelector},
	 * but return the wrapped element.
	 * @param   selector the selector of the element to match
	 * @returns the wrapped element, or `null` if there is no match
	 */
	querySelector(selector: string): xjs_Element|null|ParentNode;

	/**
	 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/querySelectorAll|ParentNode#querySelectorAll},
	 * but return an array of wrapped elements.
	 * @param   selector the selector of the element(s) to match
	 * @returns a (possibly empty) array of wrapped elements
	 */
	querySelectorAll(selector: string): xjs_Element[];
}
