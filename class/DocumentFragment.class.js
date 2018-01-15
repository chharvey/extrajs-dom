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
}

module.exports = DocumentFragment
