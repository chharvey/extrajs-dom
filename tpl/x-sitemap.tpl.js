const xjs = {
  HTMLTemplateElement: require('../class/HTMLTemplateElement.class.js'),
}

/**
 * @summary Sitemap display.
 * @param   {DocumentFragment} frag the template content with which to render
 * @param   {Array<{name:string, url:string}>} data array of data, each representing a subpage // TODO use sdo.WebPage
 */
function xSitemap(frag, data) {
  let container = frag.querySelector('ol')
  let itemrenderer = new xjs.HTMLTemplateElement(container.querySelector('template')).setRenderer(function (f, d) {
    f.querySelector('[itemprop="url" ]').href        = d.url
    f.querySelector('[itemprop="name"]').textContent = d.name
  })
  container.append(...data.map((subpage) => itemrenderer.render(subpage)))
}

module.exports = xSitemap
