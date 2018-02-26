const xjs = {
  Element: require('./Element.class.js'),
}

/**
 * Wrapper for an HTML element.
 * @see https://www.w3.org/TR/html/dom.html#htmlelement
 * @extends xjs.Element
 */
xjs.HTMLElement = class extends xjs.Element {
  /**
   * @summary Construct a new xjs.HTMLElement object.
   * @param {HTMLElement} node the node to wrap
   */
  constructor(node) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   * @type {HTMLElement}
   */
  get node() { return super.node }

  ////////////////////
  // GLOBAL ATTRIBUTES
  ////////////////////
  /**
   * @summary {@link HTMLElement#title}, but returns this object when done (if setting).
   * @description This method exists simply for chaining.
   * @param   {string=} value the value to set
   * @returns {(xjs.HTMLElement|string)} `this` if setting; the attribute value if getting
   */
  title(value) {
    if (arguments.length) {
      this.node.title = value
      return this
    } else return this.node.title
  }

  /**
   * @summary {@link HTMLElement#lang}, but returns this object when done (if setting).
   * @description This method exists simply for chaining.
   * @param   {string=} value the value to set
   * @returns {(xjs.HTMLElement|string)} `this` if setting; the attribute value if getting
   */
  lang(value) {
    if (arguments.length) {
      this.node.lang = value
      return this
    } else return this.node.lang
  }

  /**
   * @summary {@link HTMLElement#dir}, but returns this object when done (if setting).
   * @description This method exists simply for chaining.
   * @param   {string=} value the value to set
   * @returns {(xjs.HTMLElement|string)} `this` if setting; the attribute value if getting
   */
  dir(value) {
    if (arguments.length) {
      this.node.dir = value
      return this
    } else return this.node.dir
  }

  ///////////////////
  // USER INTERACTION
  ///////////////////
  /**
   * @summary {@link HTMLElement#hidden}, but returns this object when done (if setting).
   * @description This method exists simply for chaining.
   * @param   {boolean=} value the value to set
   * @returns {(xjs.HTMLElement|boolean)} `this` if setting; the attribute value if getting
   */
  hidden(value) {
    if (arguments.length) {
      this.node.hidden = value
      return this
    } else return this.node.hidden
  }

  /**
   * @summary {@link HTMLElement#tabIndex}, but returns this object when done (if setting).
   * @description This method exists simply for chaining.
   * @param   {number=} value the value to set
   * @returns {(xjs.HTMLElement|number)} `this` if setting; the attribute value if getting
   */
  tabIndex(value) {
    if (arguments.length) {
      this.node.tabIndex = value
      return this
    } else return this.node.tabIndex
  }
}

module.exports = xjs.HTMLElement
