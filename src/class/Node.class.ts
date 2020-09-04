/**
 * Represents the type of node.
 * @see https://www.w3.org/TR/dom/#dom-node-nodetype
 */
export enum NodeType {
  ELEMENT_NODE                =  1,
  ATTRIBUTE_NODE              =  2, // XXX{DEPRECATED}
  TEXT_NODE                   =  3,
  CDATA_SECTION_NODE          =  4, // XXX{DEPRECATED}
  ENTITY_REFERENCE_NODE       =  5, // XXX{DEPRECATED}
  ENTITY_NODE                 =  6, // XXX{DEPRECATED}
  PROCESSING_INSTRUCTION_NODE =  7,
  COMMENT_NODE                =  8,
  DOCUMENT_NODE               =  9,
  DOCUMENT_TYPE_NODE          = 10,
  DOCUMENT_FRAGMENT_NODE      = 11,
  NOTATION_NODE               = 12, // XXX{DEPRECATED}
}

/**
 * Wrapper for a Node.
 * @see https://www.w3.org/TR/dom/#node
 */
export default class xjs_Node {
  /**
   * The wrapped DOM Node.
   */
  private readonly _NODE: Node

  /**
   * Construct a new xjs_Node object.
   * @param node the node to wrap
   */
  constructor(node: Node) {
    this._NODE = node
  }
  /**
   * This wrapper’s node.
   */
  get node(): Node { return this._NODE }


  /**
   * Get {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent|Node#textContent}.
   * @see https://www.w3.org/TR/dom/#dom-node-textcontent
   * @returns the `textContent` of this node
   */
  textContent(): string|null;
  /**
   * Set {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent|Node#textContent}, and returns this object when done.
   *
   * This method exists simply for chaining.
   * @param   text the content to set
   * @returns `this`
   */
  textContent(text: string): this;
  textContent(text?: any): any {
		if (!arguments.length) return this.node.textContent
		this.node.textContent = text
		return this
  }

  /**
	* @deprecated DEPRECATED: Use `.run()` instead.
   * Execute a function acting on this node, and then return this node.
   *
   * Simplifies chaining when performing void tasks,
   * especially tasks that have not been defined in this implementation.
   * Note that this function is not asynchronous, and does not accept asynchronous arguments.
   * @param   executable the function to call in the context of `this`
   * @returns `this`
   */
  exe(executable: (this: this) => void): this {
    executable.call(this)
    return this
  }

	/**
	 * Execute a callback acting on this node, and then return this node.
	 *
	 * Simplifies chaining when performing void tasks,
	 * especially tasks that have not been defined in this implementation.
	 * Note that this function is not asynchronous, and does not accept asynchronous arguments.
	 * @param   callback the function to call, taking `this` as its only argument, and returning `void`
	 * @returns `this`
	 */
	run(callback: (arg: this) => void): this {
		callback(this)
		return this
	}

	/**
	* @deprecated DEPRECATED: Use `.select()` instead.
	 * Execute a function based on a condition.
	 *
	 * Given a condition, execute one function upon passing, or execute another upon failure.
	 * Note that this function is not asynchronous, and does not accept asynchronous arguments.
	 * @param   condition the condition to evaluate; will be converted to boolean
	 * @param   onResolve the executable to call (in the context of `this`) if the condition is truthy
	 * @param   onReject  the executable to call (in the context of `this`) if the condition is falsy
	 * @returns `this`
	 */
	ifElse(condition: any, onResolve: (this: this) => void, onReject: (this: this) => void = () => {}): this {
		return this.exe((!!condition) ? onResolve : onReject)
	}

	/**
	 * Execute a function based on a condition.
	 *
	 * Given a condition, execute one function upon passing, or execute another upon failure.
	 * Note that this function is not asynchronous, and does not accept asynchronous arguments.
	 * @param   condition the condition to evaluate; will be converted to boolean
	 * @param   onTrue    the callback to call (with `this` as its parameter) if the condition is truthy
	 * @param   onFalse   the callback to call (with `this` as its parameter) if the condition is falsy
	 * @returns `this`
	 */
	select(condition: unknown, onTrue: (arg: this) => void, onFalse: (arg: this) => void = () => {}): this {
		return this.run((!!condition) ? onTrue : onFalse)
	}

  /**
   * Remove all inner whitespace text nodes from this node, and return it.
   *
   * ```js
   * let div = document.createElement('div')
   * div.innerHTML = `
   *   <h1>
   *     <em>Hello </em>
   *     <b>Worl d</b>
   *   </h1>
   * `
   * let trimmed_div = new xjs.Node(div).trimInner().node
   * return div.innerHTML === `
   *   <h1>
   *     <em>Hello </em>
   *     <b>Worl d</b>
   *   </h1>
   * `
   *   && trimmed_div.innerHTML = `<h1><em>Hello </em><b>Worl d</b></h1>`
   * ```
   *
   * @returns `this`
   */
  trimInner(): this {
    [...this.node.childNodes].forEach((child) => { // NB: `NodeList#forEach()` is live, so `.remove()` will not work as intended
			(new Map([
				[NodeType.ELEMENT_NODE, () => { new xjs_Node(child).trimInner() }],
				[NodeType.TEXT_NODE   , () => { if (child.textContent !.trim() === '') child.remove() }],
			]).get(child.nodeType) || (() => {}))()
    })
    return this
  }

  /**
   * Remove all child nodes from this node, and return it.
   * @returns `this`
   */
  empty(): this {
    [...this.node.childNodes].forEach((child) => { // NB: `NodeList#forEach()` is live, so `.remove()` will not work as intended
      child.remove()
    })
    return this
  }
}
