const Element = require('../src/Element.class.js')

/**
 * Represents an HTML UL element.
 * @see https://www.w3.org/TR/html/grouping-content.html#htmlulistelement-htmlulistelement
 * @extends Element
 */
class HTMLUListElement extends Element {
  /**
   * @summary Construct a new HTMLUListElement object.
   * @version EXPERIMENTAL
   */
  constructor() {
    super('ul')
  }



  /**
   * @summary Mark up data using an HTML UL element.
   * @description This method is a specific case of {@link Element.data}, for unordered lists.
   * The argument must be an (empty) array of things. A `<ul>` element is returned, with `<li>` items,
   * where each item is then evaluated by {@link Element.data}.
   * Optionally, an `options` argument may be supplied to enhance the data;
   * it has the same specs described in {@link Element.data}.
   *
   * @version EXPERIMENTAL
   * @param   {Array<*>} list the data to mark up
   * @param   {!Object=} options configurations for the output
   * @param   {?Object<Object<string>>=} options.attributes describes how to render the output elements’ attributes
   * @param   {?Object<string>=} options.attributes.list attributes of the list (`<ul>`)
   * @param   {?Object<string>=} options.attributes.item attributes of the item (`<li>`)
   * @param   {!Object=} options.options configurations for nested items
   * @returns {string} the argument rendered as an HTML UL element
   */
  static data(list, options = {}) {
    let attr = {
      list: (options.attributes && options.attributes.list) || null,
      item: (options.attributes && options.attributes.item) || null,
    }
    return new HTMLUListElement().attr(attr.list)
      .addContent(list.map((item) =>
        new Element('li').attr(attr.item).addContent(Element.data(item, options.options))
      ))
      .view.html()
  }
}

module.exports = HTMLUListElement
