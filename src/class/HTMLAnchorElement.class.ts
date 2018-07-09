import {dev_HTMLAnchorElement} from '../dev.d'
import {ValueArg} from './Element.class'
import xjs_HTMLElement from './HTMLElement.class'


/**
 * Wrapper for HTML `a` element.
 * @see https://www.w3.org/TR/html52/textlevel-semantics.html#htmlanchorelement
 */
export default class xjs_HTMLAnchorElement extends xjs_HTMLElement {
  /**
   * @summary Construct a new xjs_HTMLAnchorElement object.
   * @param node the node to wrap
   */
  constructor(node: HTMLAnchorElement) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   */
  get node(): dev_HTMLAnchorElement { return <dev_HTMLAnchorElement>super.node }

  /**
   * @summary Reflect the `href` content attribute.
   * @see https://www.w3.org/TR/html52/links.html#dom-htmlhyperlinkelementutils-href
   * @param   val the value to set
   * @param   this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns `this` if setting the attribute, else the value of the attribute (or `null` if it hasn’t been set)
   */
  href(val?: ValueArg, this_arg: any = this): (this|string|null) {
    return this.attr('href', val, this_arg)
  }

  /**
   * @summary Reflect the `target` content attribute.
   * @see https://www.w3.org/TR/html52/textlevel-semantics.html#dom-htmlanchorelement-target
   * @param   val the value to set
   * @param   this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns `this` if setting the attribute, else the value of the attribute (or `null` if it hasn’t been set)
   */
  target(val?: ValueArg, this_arg: any = this): (this|string|null) {
    return this.attr('target', val, this_arg)
  }

  /**
   * @summary Reflect the `download` content attribute.
   * @see https://www.w3.org/TR/html52/textlevel-semantics.html#dom-htmlanchorelement-download
   * @param   val the value to set
   * @param   this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns `this` if setting the attribute, else the value of the attribute (or `null` if it hasn’t been set)
   */
  download(val?: ValueArg, this_arg: any = this): (this|string|null) {
    return this.attr('download', val, this_arg)
  }

  /**
   * @summary Reflect the `rel` content attribute.
   * @see https://www.w3.org/TR/html52/textlevel-semantics.html#dom-htmlanchorelement-rel
   * @param   val the value to set
   * @param   this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns `this` if setting the attribute, else the value of the attribute (or `null` if it hasn’t been set)
   */
  rel(val?: ValueArg, this_arg: any = this): (this|string|null) {
    return this.attr('rel', val, this_arg)
  }

  /**
   * @summary Reflect the `rev` content attribute.
   * @see https://www.w3.org/TR/html52/textlevel-semantics.html#dom-htmlanchorelement-rev
   * @param   val the value to set
   * @param   this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns `this` if setting the attribute, else the value of the attribute (or `null` if it hasn’t been set)
   */
  rev(val?: ValueArg, this_arg: any = this): (this|string|null) {
    return this.attr('rel', val, this_arg)
  }

  /**
   * @summary Reflect the `hreflang` content attribute.
   * @see https://www.w3.org/TR/html52/textlevel-semantics.html#dom-htmlanchorelement-hreflang
   * @param   val the value to set
   * @param   this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns `this` if setting the attribute, else the value of the attribute (or `null` if it hasn’t been set)
   */
  hreflang(val?: ValueArg, this_arg: any = this): (this|string|null) {
    return this.attr('hreflang', val, this_arg)
  }

  /**
   * @summary Reflect the `type` content attribute.
   * @see https://www.w3.org/TR/html52/textlevel-semantics.html#dom-htmlanchorelement-type
   * @param   val the value to set
   * @param   this_arg optionally pass in another object to use as `this` inside the given function; only applicable if `value` is a function
   * @returns `this` if setting the attribute, else the value of the attribute (or `null` if it hasn’t been set)
   */
  type(val?: ValueArg, this_arg: any = this): (this|string|null) {
    return this.attr('type', val, this_arg)
  }
}
