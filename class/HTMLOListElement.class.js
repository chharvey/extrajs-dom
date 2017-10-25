const Element = require('../src/Element.class.js')

/**
 * Represents an HTML OL element.
 * @see https://www.w3.org/TR/html/grouping-content.html#htmlolistelement-htmlolistelement
 * @extends Element
 */
class HTMLOListElement extends Element {
  /**
   * @summary Construct a new HTMLOListElement object.
   * @version EXPERIMENTAL
   */
  constructor() {
    super('ol')
  }



  /**
   * @summary Mark up data using an HTML OL element.
   * @description This method is a specific case of {@link Element.data}, for ordered lists.
   * The argument must be an (empty) array of things. A `<ol>` element is returned, with `<li>` items,
   * where each item is then evaluated by {@link Element.data}.
   * Optionally, an `options` argument may be supplied to enhance the data;
   * it has the same specs described in {@link Element.data}.
   *
   * @version EXPERIMENTAL
   * @param   {Array<*>} list the data to mark up
   * @param   {!Object=} options configurations for the output
   * @param   {?Object<Object<string>>=} options.attributes describes how to render the output elements’ attributes
   * @param   {?Object<string>=} options.attributes.list attributes of the list (`<ol>`)
   * @param   {?Object<string>=} options.attributes.item attributes of the item (`<li>`)
   * @param   {!Object=} options.options configurations for nested items
   * @returns {string} the argument rendered as an HTML OL element
   */
  static data(list, options = {}) {
    let attr = {
      list: (options.attributes && options.attributes.list) || null,
      item: (options.attributes && options.attributes.item) || null,
    }
    return new HTMLOListElement().attr(attr.list)
      .addContent(list.map((item) =>
        new Element('li').attr(attr.item).addContent(Element.data(item, options.options))
      ))
      .view.html()
  }
}

module.exports = HTMLOListElement
