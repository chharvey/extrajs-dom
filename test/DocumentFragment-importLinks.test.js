const jsdom = require('jsdom')

const xjs = {
  ...require('extrajs'),
  ...require('../index.js'),
}

const dom = new jsdom.JSDOM(`
<!doctype html>
<html lang="en">
  <head><title>test</title></head>
  <body>
    <ul>
      <template id="tpl-list">
        <li>
          <link id="link1" rel="import" data-import="template" href="x-test.tpl.html"/>
        </li>
      </template>
    </ul>
    <link id="link2" rel="import" data-import="document" href="x-test.tpl.html"/>
  </body>
</html>
`)

const {document} = dom.window

new xjs.DocumentFragment(document.querySelector('ul > template').content).importLinks(__dirname)
document.body.innerHTML = new xjs.DocumentFragment(jsdom.JSDOM.fragment(document.body.innerHTML)).importLinks(__dirname).innerHTML()

console.log(dom.serialize())
