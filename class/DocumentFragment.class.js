/**
 * Represents a document fragment node.
 * @see https://www.w3.org/TR/dom/#documentfragment
 */
class DocumentFragment {
  /**
   * @summary Construct a new DocumentFragment object.
   * @version EXPERIMENTAL
   */
  constructor() {
  }


  /**
   * @summary Return a concatenation of content.
   * @description Concatenate multiple element/string outputs. Useful if you need siblings with no parent.
   *
   * @example <caption>multiple arguments</caption>
   * let snip = DocumentFragment.concat(
   *   new Element('strong').addContent(`hello`),
   *   ` to the `,
   *   new Element('em').addContent(`world`),
   *   null,
   *   new Element('mark').addContent(`!`)
   * )
   * return snip === `<strong>hello</strong> to the <em>world</em><mark>!</mark>`
   *
   * @example <caption>one single array argument</caption>
   * let snip = DocumentFragment.concat([
   *   new Element('strong').addContent(`hello`),
   *   ` to the `,
   *   new Element('em').addContent(`world`),
   *   null,
   *   new Element('mark').addContent(`!`),
   * ])
   * return snip === `<strong>hello</strong> to the <em>world</em><mark>!</mark>`
   *
   * @version EXPERIMENTAL
   * @param   {...Element.ContentArg} contents the contents to concatenate
   * @returns {string} the resulting output of concatenation
   */
  static concat(...contents) {
    if (xjs.Object.typeOf(contents[0]) === 'array') return Element.documentFragment(...contents[0])
    return contents.map((c) =>
      (c instanceof Element) ? c.view.html() : c
    ).join('')
  }

  /**
   * @summary Return the "innerHTML" of a document fragment.
   * @version EXPERIMENTAL
   * @param   {DocumentFragment} frag the document fragment to stringify
   * @returns {string} a concatenation of the `outerHTML` of the fragment’s element children
   */
  static innerHTML(frag) {
    return Array.from(frag.childNodes).map(function (node) {
      // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
      let mapfn = {
        1: (el)   => el.outerHTML    , // ELEMENT_NODE
        2: (node) => null            , // ATTRIBUTE_NODE
        3: (text) => text.textContent, // TEXT_NODE
        8: (comm) => null            , // COMMENT_NODE
        11: (frag) => DocumentFragment.innerHTML(frag), // DOCUMENT_FRAGMENT_NODE
        default: (node) => null,
      }
      return (mapfn[node.nodeType] || mapfn.default)(node)
    }).join('')
  }
}

module.exports = DocumentFragment
