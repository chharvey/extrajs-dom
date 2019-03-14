import {ValueType, ValueFunction} from './Element.class'
import xjs_HTMLElement from './HTMLElement.class'


/**
 * Wrapper for HTML `img` elements.
 * @see https://www.w3.org/TR/html52/semantics-embedded-content.html#htmlimageelement
 */
export default class xjs_HTMLImageElement extends xjs_HTMLElement {
	/**
	 * Construct a new xjs_HTMLImageElement object.
	 * @param node the node to wrap
	 */
	constructor(node: HTMLImageElement) {
		super(node)
	}
	/**
	 * This wrapper’s node.
	 */
	get node(): HTMLImageElement { return super.node as HTMLImageElement}

	/**
	 * Reflect the `src` content attribute.
	 *
	 * @see https://www.w3.org/TR/html52/semantics-embedded-content.html#dom-htmlimageelement-src
	 * @returns the value of the attribute, or `null` if it hasn’t been set
	 */
	src(): string|null;
	/**
	 * @param   val the value to set, or `null` to remove
	 * @returns `this`
	 */
	src(val: ValueType): this;
	/**
	 * @param   val the function to call when setting the value
	 * @param   this_arg optionally pass in another object to use as `this` inside the given function
	 * @returns `this`
	 */
	src(val: ValueFunction, this_arg?: unknown): this;
	src(val?: any, this_arg: any = this): any {
		return this.attr('src', val, this_arg)
	}

	/**
	 * Reflect the `alt` content attribute.
	 *
	 * @see https://www.w3.org/TR/html52/semantics-embedded-content.html#dom-htmlimageelement-alt
	 * @returns the value of the attribute, or `null` if it hasn’t been set
	 */
	alt(): string|null;
	/**
	 * @param   val the value to set, or `null` to remove
	 * @returns `this`
	 */
	alt(val: ValueType): this;
	/**
	 * @param   val the function to call when setting the value
	 * @param   this_arg optionally pass in another object to use as `this` inside the given function
	 * @returns `this`
	 */
	alt(val: ValueFunction, this_arg?: unknown): this;
	alt(val?: any, this_arg: any = this): any {
		return this.attr('alt', val, this_arg)
	}
}
