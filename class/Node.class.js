const xjs = {}

/**
 * Wrapper for a Node.
 * @see https://www.w3.org/TR/dom/#node
 */
xjs.Node = class {
  /**
   * @summary Construct a new xjs.Node object.
   * @version EXPERIMENTAL
   * @param {Node} node the node to wrap
   */
  constructor(node) {
    /**
     * @summary Throw an error if `null` is passed to constructor.
     * @description HACK: This error should be thrown by compiler, not runner.
     * @type {TypeError}
     */
    if (node === null) throw new TypeError('Node cannot be null.')

    /**
     * @summary The wrapped DOM Node.
     * @private
     * @final
     * @type {Node}
     */
    this._NODE = node
  }
  /**
   * @summary This wrapper’s node.
   * @type {Node}
   */
  get node() { return this._NODE }

  /**
   * @summary Execute a function acting on this node, and then return this node.
   * @description Simplifies chaining when performing void tasks,
   * especially tasks that have not been defined in this implementation.
   * @param   {function():undefined} executable any function that takes 0 arguments and returns `undefined` (or does not have a return statement)
   * @returns {Node} `this`
   */
  exe(executable) {
    executable.call(this)
    return this
  }


  /**
   * @summary {@link Node#textContent}, but returns this object when done (if setting).
   * @description This method exists simply for chaining.
   * @version LOCKED
   * @param   {string=} text the content to set
   * @returns {(xjs.Node|string)} `this` if setting; the textContent if getting
   */
  textContent(text) {
    if (arguments.length) {
      this.node.textContent = text
      return this
    } else return this.node.textContent
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
   * @returns {xjs.Node} `this`
   */
  trimInner() {
    Array.from(this.node.childNodes).forEach(function (child) { // NB: `NodeList#forEach()` does not work quite as well as `Array#forEach()`
      if (child.nodeType === 3 && child.textContent.trim() === '') child.remove()
      else if (child.nodeType === 1) new xjs.Node(child).trimInner()
    })
    return this
  }

  /**
   * @summary Remove all child nodes from this node, and return it.
   * @returns {xjs.Node} `this`
   */
  empty() {
    // this.node.childNodes.forEach(function (child) { child.remove() } ) // NB: `NodeList#forEach()` does not work quite as well as `Array#forEach()`
    while (this.node.hasChildNodes()) this.node.firstChild.remove()
    return this
  }
}

module.exports = xjs.Node
