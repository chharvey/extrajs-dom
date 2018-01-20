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
   * @summary Remove all inner whitespace text nodes from a node, and return it.
   * @example
   * let snip = new HTMLElement('div').addContent(`
   *   <h1>
   *     <em>Hello </em>
   *     <b>Worl d</b>
   *   </h1>
   * `)
   * let snipTrimmed = Node.trimInner(snip)
   * return snip.innerHTML === `
   *   <h1>
   *     <em>Hello </em>
   *     <b>Worl d</b>
   *   </h1>
   * `
   *   && snipTrimmed.innerHTML = `<h1><em>Hello </em><b>Worl d</b></h1>`
   * @param   {Node} node the node from which to remove all whitespace
   * @returns {Node} the modified node
   */
  static trimInner(node) {
    Array.from(node.childNodes).forEach(function (child) { // NB: `NodeList#forEach()` does not work quite as well as `Array#forEach()`
      if (child.nodeType === 3 && child.textContent.trim() === '') child.remove()
      else if (child.nodeType === 1) Node.trimInner(child)
    })
    return node
  }

  /**
   * @summary Remove all child nodes from a node, and return the modified node.
   * @param   {Node} node the node from which to remove all child nodes
   * @returns {Node} the given node, emptied
   */
  static empty(node) {
    // node.childNodes.forEach(function (child) { child.remove() } ) // NB: `NodeList#forEach()` does not work quite as well as `Array#forEach()`
    while (node.hasChildNodes()) node.firstChild.remove()
    return node
  }
}

module.exports = xjs.Node
