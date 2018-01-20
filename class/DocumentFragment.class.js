const xjs = {
  Object : require('extrajs').Object,
  Node   : require('./Node.class.js'),
  Element: require('./Element.class.js'),
}

/**
 * Wrapper for a DocumentFragment.
 * @see https://www.w3.org/TR/dom/#documentfragment
 */
xjs.DocumentFragment = class extends xjs.Node {
  /**
   * @summary Construct a new xjs.DocumentFragment object.
   * @version EXPERIMENTAL
   * @param {DocumentFragment} node the node to wrap
   */
  constructor(node) {
    super(node)
  }
  /**
   * @summary This wrapper’s node.
   * @type {DocumentFragment}
   */
  get node() { return super.node }


  /**
   * @summary {@link DocumentFragment#append}, but returns this object when done.
   * @description This method exists simply for chaining.
   * @example
   * let strong = document.createElement('strong')
   * strong.textContent = 'hello'
   * let em = document.createElement('em')
   * let mark = document.createElement('mark')
   *
   * let snippet = new xjs.DocumentFragment(new DocumentFragment())
   *   .append(...[
   *     strong,                                       // DOM Node
   *     ` to the `,                                   // string
   *     new Comment(`great`),                         // DOM Node
   *     `<small>big</small> `,                        // string with HTML
   *     new xjs.Element(em).addContent(`world`).node, // (unwrapped) DOM Node
   *     null,                                         // null
   *     new xjs.Element(mark).addContent(`!`),        // wrapped DOM Node
   *   ]).innerHTML
   * return snippet === `<strong>hello</strong> to the <!--great--><small>big</small> <em>world</em><mark>!</mark>`
   * @param   {...?(Node|xjs.Node|string)} contents the contents to append
   * @returns {xjs.DocumentFragment} `this`
   */
  append(...contents) {
    this.node.append(...contents)
    return this
  }

  /**
   * @summary The "innerHTML" of this document fragment.
   * @description A concatenation of all the `outerHTML` and/or data of the fragment’s node children.
   * @version EXPERIMENTAL
   * @type {string}
   */
  get innerHTML() {
    return Array.from(this.node.childNodes).map(function (node) {
      // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
      // TODO make this a static property of Node
      let mapfn = {
        1: (el)   => el.outerHTML    , // ELEMENT_NODE
        2: (node) => null            , // ATTRIBUTE_NODE
        3: (text) => text.data, // TEXT_NODE
        8: (comm) => `<!--${c.data}-->`, // COMMENT_NODE
        11: (frag) => new xjs.DocumentFragment(frag).innerHTML, // DOCUMENT_FRAGMENT_NODE
        default: (node) => null,
      }
      return (mapfn[node.nodeType] || mapfn.default)(node)
    }).join('')
  }


  /**
   * @summary Concatenate multiple contents into text.
   * @version EXPERIMENTAL
   * @param   {...?(Node|xjs.Node|string)} contents the contents to concatenate
   * @returns {string} the resulting output of concatenation
   */
  static concat(...contents) {
    return new xjs.DocumentFragment(new DocumentFragment()).append(...contents).innerHTML
  }
}

module.exports = xjs.DocumentFragment
