const jsdom = require('jsdom')

const xjs = {
  ...require('extrajs'),
  ...require('../index.js'),
}

let {document} = new jsdom.JSDOM(`
<!doctype html>
<html lang="en">
<head><title>test</title></head>
<body>
<ul class="list">
  <template>
    <li class="list-item">
      <a class="list-link" href="{{ url }}" itemprop="significantLink">{{ text }}</a>
    </li>
  </template>
</ul>
</body>
</html>
`).window

let data = [
  { "url": "#0", "text": "Career Connections" },
  { "url": "#1", "text": "Getting Licensed & Certified" },
  { "url": "#2", "text": "Career resources" },
  { "url": "#3", "text": "Code of Ethics" }
]

let list = document.querySelector('ul.list')

new xjs.HTMLListElement(list)
  .populate(data, function (frag, d) {
    frag.querySelector('.list-link').href        = d.url
    frag.querySelector('.list-link').textContent = d.text
  })

console.log(list.outerHTML)
