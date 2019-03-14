import {ValueType, ValueFunction} from './Element.class'
import xjs_HTMLElement from './HTMLElement.class'


/**
 * Wrapper for HTML `th` and `td` elements.
 * @see https://www.w3.org/TR/html52/tabular-data.html#htmltablecellelement
 */
export default class xjs_HTMLTableCellElement extends xjs_HTMLElement {
  /**
   * Construct a new xjs_HTMLTableCellElement object.
   * @param node the node to wrap
   */
  constructor(node: HTMLTableCellElement) {
    super(node)
  }
  /**
   * This wrapper’s node.
   */
  get node(): HTMLTableCellElement { return super.node as HTMLTableCellElement }

  /**
   * Reflect the `headers` content attribute.
   *
   * Note: The IDL attribute `HTMLTableCellElement#headers` returns a `string` as indicated
   * by the {@link https://html.spec.whatwg.org/multipage/tables.html#dom-tdth-headers|WHATWG Specification}.
   * See https://github.com/whatwg/html/pull/1026.
   * @see https://www.w3.org/TR/html52/tabular-data.html#dom-htmltablecellelement-headers
   * @returns the value of the attribute, or `null` if it hasn’t been set
   */
  headers(): string|null;
  /**
   * @param   val the value to set, or `null` to remove
   * @returns `this`
   */
  headers(val: ValueType): this;
  /**
   * @param   val the function to call when setting the value
   * @param   this_arg optionally pass in another object to use as `this` inside the given function
   * @returns `this`
   */
  headers(val: ValueFunction, this_arg?: unknown): this;
  headers(val?: any, this_arg: any = this): any {
    return this.attr('headers', val, this_arg)
  }
}
