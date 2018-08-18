/**
 * Wrapper for a Node.
 * @see https://www.w3.org/TR/dom/#node
 */
export default class xjs_Node {
  /**
   * @summary The wrapped DOM Node.
   */
  private readonly _NODE: Node

  /**
   * @summary Construct a new xjs_Node object.
   * @param node the node to wrap
   */
  constructor(node: Node) {
    this._NODE = node
  }
  /**
   * @summary This wrapper’s node.
   */
  get node(): Node { return this._NODE }


  /**
   * @summary Get {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent|Node#textContent}.
   * @see https://www.w3.org/TR/dom/#dom-node-textcontent
   * @returns the `textContent` of this node
   */
  textContent(): string|null;
  /**
   * @summary Set {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent|Node#textContent}, and returns this object when done.
   * @description This method exists simply for chaining.
   * @param   text the content to set
   * @returns `this`
   */
  textContent(text: string): this;
  textContent(text?: any): any {
    if (arguments.length) {
      this.node.textContent = text
      return this
    }
    return this.node.textContent
  }

  /**
   * @summary Execute a function acting on this node, and then return this node.
   * @description Simplifies chaining when performing void tasks,
   * especially tasks that have not been defined in this implementation.
   * @param   executable any function that takes 0 arguments and returns `undefined` (or does not have a return statement)
   * @returns `this`
   */
  exe(executable: (this: xjs_Node) => void): this {
    executable.call(this)
    return this
  }

  /**
   * @summary Remove all inner whitespace text nodes from this node, and return it.
   * @example
   * let snip = new HTMLElement(document.createElement('div')).addContent(`
   *   <h1>
   *     <em>Hello </em>
   *     <b>Worl d</b>
   *   </h1>
   * `)
   * let snipTrimmed = new xjs.Node(snip).trimInner()
   * return snip.node.innerHTML === `
   *   <h1>
   *     <em>Hello </em>
   *     <b>Worl d</b>
   *   </h1>
   * `
   *   && snipTrimmed.node.innerHTML = `<h1><em>Hello </em><b>Worl d</b></h1>`
   * @returns `this`
   */
  trimInner(): this {
    // TODO make an enum for node types
    // xjs_Node.nodeType[3] = 'TEXT_NODE'
    // xjs_Node.nodeType[1] = 'ELEMENT_NODE'
    [...this.node.childNodes].forEach((child) => { // NB: `NodeList#forEach()` is live, so `.remove()` will not work as intended
      if (child.nodeType === 3 && (<string>child.textContent).trim() === '') child.remove()
      else if (child.nodeType === 1) new xjs_Node(child).trimInner()
    })
    return this
  }

  /**
   * @summary Remove all child nodes from this node, and return it.
   * @returns `this`
   */
  empty(): this {
    [...this.node.childNodes].forEach((child) => { // NB: `NodeList#forEach()` is live, so `.remove()` will not work as intended
      child.remove()
    })
    return this
  }
}
